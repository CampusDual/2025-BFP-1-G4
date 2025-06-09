package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.ILoginService;
import com.campusdual.bfp.model.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/login")
public class LoginControllerCopy {
    @Autowired
    private ILoginService loginService;

    @GetMapping(value = "/testController")
    public String testLoginController() {
        return "Login controller works!";
    }

    @PostMapping(value = "/get")
    public LoginDTO queryLogin(@RequestBody LoginDTO loginDTO) {
        return loginService.queryLogin(loginDTO);
    }

    @GetMapping(value = "/getAll")
    public List<LoginDTO> queryAllLogin() {
        return loginService.queryAllLogin();
    }

    @PostMapping(value = "/add")
    public int addLogin(@RequestBody LoginDTO loginDTO) {
        return loginService.insertLogin(loginDTO);
    }

    @PutMapping(value = "/update")
    public int updateLogin(@RequestBody LoginDTO loginDTO) {
        return loginService.updateLogin(loginDTO);
    }

    @DeleteMapping(value = "/delete")
    public int deleteLogin(@RequestBody LoginDTO loginDTO) {
        return loginService.deleteLogin(loginDTO);
    }


}
