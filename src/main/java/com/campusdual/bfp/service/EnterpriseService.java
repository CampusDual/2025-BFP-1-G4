package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IEnterpriseService;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.UserRole;
import com.campusdual.bfp.model.dao.EnterpriseDao;
import com.campusdual.bfp.model.dao.UserDao;
import com.campusdual.bfp.model.dao.UserRoleDao;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.EnterpriseUserDTO;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dao.OffersDao;
import com.campusdual.bfp.model.dto.dtomapper.EnterpriseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service("EnterpriseService")
@Lazy
public class EnterpriseService implements IEnterpriseService {

    @Autowired
    private EnterpriseDao enterpriseDao;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserRoleDao userRoleDao;

    @Autowired
    private OffersDao offerDao;

    @Override
    public EnterpriseDTO queryEnterprise(EnterpriseDTO enterpriseDTO) {
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        return EnterpriseMapper.INSTANCE.toDTO(enterpriseDao.getReferenceById(enterprise.getId()));
    }

    @Override
    public List<EnterpriseDTO> queryAllEnterprise() {
        return EnterpriseMapper.INSTANCE.toDTOList(enterpriseDao.findAll());
    }

    @Override
    public int insertEnterprise(EnterpriseUserDTO dto) {
        EnterpriseDTO enterpriseDTO = dto.getEnterprise();
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        enterpriseDao.saveAndFlush(enterprise);

        UserDTO userDTO = new UserDTO();
        userDTO.setName(enterpriseDTO.getName());
        userDTO.setEmail(enterpriseDTO.getEmail());
        userDTO.setPhonenumber(enterpriseDTO.getPhonenumber());
        userDTO.setEnterpriseid(enterprise.getId());
        userDTO.setLogin(dto.getLogin());
        userDTO.setPassword(dto.getPassword());

        userService.registerNewUser(
                userDTO.getLogin(),
                userDTO.getName(),
                userDTO.getPhonenumber(),
                userDTO.getPassword(),
                null,
                null,
                userDTO.getEmail(),
                userDTO.getLinkedin(),
                enterprise
        );

        int userId = userService.getUserIdByLogin(userDTO.getLogin());
        userService.addRoleToUser(userId, 2L);
        return enterprise.getId();
    }

    @Transactional
    @Override
    public EnterpriseDTO updateEnterprise(EnterpriseUserDTO dto) {
        EnterpriseDTO enterpriseDTO = dto.getEnterprise();
        Enterprise enterprise = enterpriseDao.getReferenceById(enterpriseDTO.getId());

        enterprise.setName(enterpriseDTO.getName());
        enterprise.setEmail(enterpriseDTO.getEmail());
        enterprise.setPhonenumber(enterpriseDTO.getPhonenumber());
        enterprise.setAddress(enterpriseDTO.getAddress());
        enterprise.setActive(enterpriseDTO.isActive());
        enterpriseDao.saveAndFlush(enterprise);

        User user = userDao.findUserByEnterpriseId(enterprise.getId());
        if(dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(userService.passwordEncoder().encode(dto.getPassword()));
        }
        user.setLogin(dto.getLogin());
        user.setName(dto.getEnterprise().getName());
        user.setPhonenumber(dto.getEnterprise().getPhonenumber());
        user.setEmail(dto.getEnterprise().getEmail());
        user.setLinkedin(dto.getLinkedin());
        user.setEnterprise(enterprise);
        userDao.saveAndFlush(user);

        return enterpriseDTO;
    }

    @Override
    public int deleteEnterprise(Integer id) {
        List<User> users = userDao.findAll()
                .stream()
                .filter(u -> u.getEnterprise() != null && id.equals(u.getEnterprise().getId()))
                .collect(Collectors.toList());

        for (User user : users) {
            List<UserRole> userRoles = userRoleDao.findAll()
                    .stream()
                    .filter(ur -> ur.getUser().getId() == user.getId())
                    .collect(Collectors.toList());
            userRoleDao.deleteAll(userRoles);
            userDao.delete(user);
        }

        enterpriseDao.deleteById(id);
        return id;
    }

    @Override
    public boolean hasActiveOffers(int id) {
        return offerDao.countActiveOffersByEnterpriseId(id) > 0;
    }

    @Override
    public List<EnterpriseDTO> findAllByActive() {
        return EnterpriseMapper.INSTANCE.toDTOList(enterpriseDao.findAllByActiveTrue());
    }

    @Override
    public EnterpriseDTO toggleActive(EnterpriseDTO enterpriseDTO) {
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        Enterprise entity = enterpriseDao.getReferenceById(enterprise.getId());
        if (entity.isActive() && hasActiveOffers(entity.getId())) {
            throw new RuntimeException("Debe desactivar las ofertas antes de desactivar la empresa");
        }
        entity.setActive(!entity.isActive());
        enterpriseDao.saveAndFlush(entity);
        return EnterpriseMapper.INSTANCE.toDTO(entity);
    }
}