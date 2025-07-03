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
import com.campusdual.bfp.model.dto.dtomapper.EnterpriseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

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
                enterprise.getId()
        );

        int userId = userService.getUserIdByLogin(userDTO.getLogin());
        userService.addRoleToUser(userId, 2L);
        return enterprise.getId();
    }

    @Override
    public int updateEnterprise(Integer id, EnterpriseDTO enterpriseDTO) {
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        enterprise.setId(id);
        enterpriseDao.saveAndFlush(enterprise);
        return enterprise.getId();
    }

    @Override
    public int deleteEnterprise(Integer id) {
        List<User> users = userDao.findAll()
                .stream()
                .filter(u -> id.equals(u.getEnterpriseId()))
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
        return false;
    }

}