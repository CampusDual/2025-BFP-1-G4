package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IEnterpriseService;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/enterprises")
public class EnterpriseController {
    @Autowired
    private IEnterpriseService enterpriseService;

    @GetMapping(value = "/testController")
    public String testEnterpriseController() {
        return "Enterprises controller works!";
    }

    @GetMapping(value = "/get")
    public EnterpriseDTO queryEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.queryEnterprise(enterpriseDTO);
    }

    @GetMapping(value = "/getAll")
    public List<EnterpriseDTO> queryAllEnterprise() {
        return enterpriseService.queryAllEnterprise();
    }

    @PostMapping(value = "/add")
    public int addEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.insertEnterprise(enterpriseDTO);
    }

    @PutMapping(value = "/update")
    public int updateEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.updateEnterprise(enterpriseDTO);
    }

    @DeleteMapping(value = "/delete")
    public int deleteEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.deleteEnterprise(enterpriseDTO);
    }

}
