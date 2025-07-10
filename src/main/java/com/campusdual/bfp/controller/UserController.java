package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IUserService;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService iuserService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "/testController")
    public String testUserController() {
        return "UserController is working!";
    }

    @GetMapping(value = "/get")
    public UserDTO queryUser(@RequestBody UserDTO userDTO) {
        return iuserService.queryUser(userDTO);
    }

    /*@PreAuthorize("hasRole('user')")
    @GetMapping(value = "/getProfile")
    public UserDTO getUserProfile(@RequestBody UserDTO userDTO) {
        return iuserService.getUserProfile(userDTO);
    }*/

    @PreAuthorize("hasRole('user')")
    @GetMapping(value = "/getProfileById/{id}")
    public UserDTO getUserProfileById(@PathVariable int id) {
        return userService.findUserById(id);
    }

    @GetMapping(value = "/getAll")
    public List<UserDTO> queryAllUsers() {
        return iuserService.queryAllUsers();
    }

    @PostMapping(value = "/add")
    public int addUser(@RequestBody UserDTO userDTO) {
        return iuserService.addUser(userDTO);
    }

    @PutMapping(value = "/update")
    public int updateUser(@RequestBody UserDTO userDTO) {
        return iuserService.updateUser(userDTO);
    }

    @PreAuthorize("hasRole('user')")
    @PutMapping(value = "/updateProfile")
    public int updateUserProfile(@RequestBody UserDTO userDTO) {
        return iuserService.updateUserProfile(userDTO);
    }

    @DeleteMapping(value = "/delete")
    public int deleteUser(@RequestBody UserDTO userDTO) {
        return iuserService.deleteUser(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        userService.registerNewUser(
                userDTO.getLogin(),
                userDTO.getName(),
                userDTO.getPhonenumber(),
                userDTO.getPassword(),
                userDTO.getSurname1(),
                userDTO.getSurname2(),
                userDTO.getEmail(),
                null
        );
        int userId = userService.getUserIdByLogin(userDTO.getLogin());
        userService.addRoleToUser(userId, 1L);
        return ResponseEntity.ok().build();
    }
}
