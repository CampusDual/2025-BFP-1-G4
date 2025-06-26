package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IUserService;
import com.campusdual.bfp.model.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping(value = "/testController")
    public String testUserController() {
        return "UserController is working!";
    }

    @GetMapping(value = "/get")
    public UserDTO queryUser(@RequestBody UserDTO userDTO) {
        return userService.queryUser(userDTO);
    }

    @GetMapping(value = "/getAll")
    public List<UserDTO> queryAllUsers() {
        return userService.queryAllUsers();
    }

    @PostMapping(value = "/add")
    public int addUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @PutMapping(value = "/update")
    public int updateUser(@RequestBody UserDTO userDTO) {
        return userService.updateUser(userDTO);
    }

    @DeleteMapping(value = "/delete")
    public int deleteUser(@RequestBody UserDTO userDTO) {
        return userService.deleteUser(userDTO);
    }

}
