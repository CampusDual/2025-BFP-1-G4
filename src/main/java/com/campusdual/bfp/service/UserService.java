package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IUserService;
import com.campusdual.bfp.model.Role;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.UserRole;
import com.campusdual.bfp.model.dao.RoleDao;
import com.campusdual.bfp.model.dao.UserDao;
import com.campusdual.bfp.model.dao.UserRoleDao;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dto.dtomapper.UserMapper;
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

    public void registerNewUser(String login, String name,String phonenumber, String password, String surname1, String surname2, String email) {
        User user = new User();
        user.setLogin(login);
        user.setName(name);
        user.setPhonenumber(phonenumber);
        user.setPassword(this.passwordEncoder().encode(password));
        user.setSurname1(surname1);
        user.setSurname2(surname2);
        user.setEmail(email);
        user.setEnterpriseId(null);
        User savedUser = this.userDao.saveAndFlush(user);

        Role role = this.roleDao.findByRoleName("ROLE_USER");
        if (role != null) {
            UserRole userRole = new UserRole();
            userRole.setUser(savedUser);
            userRole.setRole(role);
            this.userRoleDao.saveAndFlush(userRole);
        }
    }

    /*
        public void registerNewEnterprise(String username, String password) {
        User user = new User();
        user.setLogin(username);
        user.setName(username);
        user.setPassword(this.passwordEncoder().encode(password));
        User savedUser = this.userDao.saveAndFlush(user);

        Role role = this.roleDao.findByRoleName("ROLE_USER");
        if (role != null) {
            UserRole userRole = new UserRole();
            userRole.setUser(savedUser);
            userRole.setRole(role);
            this.userRoleDao.saveAndFlush(userRole);
        }
    }
     */

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
        return 0;
    }

    @Override
    public int deleteUser(UserDTO userDTO) {
        return 0;
    }
}
