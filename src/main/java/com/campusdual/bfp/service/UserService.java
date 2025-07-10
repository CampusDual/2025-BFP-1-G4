package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IUserService;
import com.campusdual.bfp.model.*;
import com.campusdual.bfp.model.dao.RoleDao;
import com.campusdual.bfp.model.dao.UserDao;
import com.campusdual.bfp.model.dao.UserRoleDao;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dto.dtomapper.UserMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Lazy
public class UserService implements IUserService, UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private UserRoleDao userRoleDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userDao.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), Collections.emptyList());
    }

    public boolean existsByUsername(String username) {
        User user = this.userDao.findByLogin(username);
        return user != null;
    }

    public void registerNewUser(String login, String name, String phonenumber, String password, String surname1, String surname2, String email, Enterprise enterprise) {
        User user = new User();
        user.setLogin(login);
        user.setName(name);
        user.setPhonenumber(phonenumber);
        user.setPassword(this.passwordEncoder().encode(password));
        user.setSurname1(surname1);
        user.setSurname2(surname2);
        user.setEmail(email);
        user.setEnterprise(enterprise);
        this.userDao.saveAndFlush(user);
    }

    public void addRoleToUser(int userid, Long roleid) {
        User user = this.userDao.findUserById(userid);
        if (user == null) return;

        Role role = this.roleDao.findById(roleid).orElse(null);
        if (role == null) return;

        boolean alreadyAssigned = userRoleDao.findUserRoleByUserAndRole(user, role) != null;
        if (!alreadyAssigned) {
            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);
            userRoleDao.saveAndFlush(userRole);
        }
    }

    public int getUserIdByLogin(String login) {
        User user = userDao.findByLogin(login);
        return user != null ? user.getId() : -1;
    }

    public String getRoleNameByUsername(String username) {
        User user = userDao.findByLogin(username);
        if (user == null || user.getAuthorities().isEmpty()) {
            return null;
        }
        // Devuelve el nombre del primer rol encontrado
        return user.getAuthorities().iterator().next().getAuthority();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDTO queryUser(UserDTO userDTO) {
        User user = UserMapper.INSTANCE.toEntity(userDTO);
        return UserMapper.INSTANCE.toDTO(userDao.getReferenceById(user.getId()));
    }

    @Override
    public List<UserDTO> queryAllUsers() {
        return UserMapper.INSTANCE.toDTOList(userDao.findAll());
    }

    @Override
    public int addUser(UserDTO userDTO) {
        return 0;
    }

    @Override
    public int updateUser(UserDTO userDTO) {
        User user = userDao.findUserById(userDTO.getId());
        if (user == null) return 0;
        user.setName(userDTO.getName());
        user.setPhonenumber(userDTO.getPhonenumber());
        user.setEmail(userDTO.getEmail());
        user.setSurname1(userDTO.getSurname1());
        user.setSurname2(userDTO.getSurname2());
        user.setLogin(userDTO.getLogin());
        user.setExperience(userDTO.getExperience());
        user.setGithub(userDTO.getGithub());
        user.setLinkedin(userDTO.getLinkedin());
        user.setDegree(userDTO.getDegree());
        user.setPresentation(userDTO.getPresentation());
        user.setModality(userDTO.getModality());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(this.passwordEncoder().encode(userDTO.getPassword()));
        }
        userDao.saveAndFlush(user);
        return user.getId();
    }

    @Override
    public int updateUserProfile(UserDTO userDTO) {
        User user = userDao.findUserById(userDTO.getId());
        if (user == null) return 0;
        BeanUtils.copyProperties(userDTO, user, "id", "password", "login", "enterprise");

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(this.passwordEncoder().encode(userDTO.getPassword()));
        }
        userDao.saveAndFlush(user);
        return user.getId();
    }

    @Override
    public int deleteUser(UserDTO userDTO) {
        User user = userDao.findUserById(userDTO.getId());
        if (user == null) return 0;
        List<UserRole> userRoles = userRoleDao.findAll()
                .stream()
                .filter(ur -> ur.getUser().getId() == user.getId())
                .collect(Collectors.toList());
        userRoleDao.deleteAll(userRoles);
        userDao.delete(user);
        return user.getId();
    }

    @Override
    public UserDTO getUserProfile(UserDTO userDTO) {
        User user = userDao.findUserById(userDTO.getId());
        if (user == null) return null;
        return UserMapper.INSTANCE.toDTO(user);
    }

    public UserDTO findUserById(int id) {
        Optional<User> userEntityOpt = userDao.findById(id);
        if (userEntityOpt.isPresent()) {
            User userEntity = userEntityOpt.get();
            UserDTO userDTO = convertToDTO(userEntity);
            return userDTO;
        } else {
            return null; // No encontrada
        }
    }

    private UserDTO convertToDTO(User entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setDegree(entity.getDegree());
        dto.setName(entity.getName());
        dto.setSurname1(entity.getSurname1());
        dto.setSurname2(entity.getSurname2());
        dto.setEmail(entity.getEmail());
        dto.setPhonenumber(entity.getPhonenumber());
        dto.setLogin(entity.getLogin());
        dto.setPassword(entity.getPassword());
        dto.setGithub(entity.getGithub());
        dto.setLinkedin(entity.getLinkedin());
        dto.setExperience(entity.getExperience());
        dto.setPresentation(entity.getPresentation());
        dto.setModality(entity.getModality());

        return dto;
    }
}
