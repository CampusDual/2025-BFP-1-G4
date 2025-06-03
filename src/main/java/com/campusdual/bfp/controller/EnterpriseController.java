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

    @PostMapping(value = "/get")
    public EnterpriseDTO queryEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.queryEnterprise(enterpriseDTO);
    }

    @GetMapping(value = "/getAll")
    public List<EnterpriseDTO> queryAllContact() {
        return enterpriseService.queryAllEnterprise();
    }

    @PostMapping(value = "/add")
    public int addContact(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.insertEnterprise(enterpriseDTO);
    }

    @PutMapping(value = "/update")
    public int updateContact(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.updateEnterprise(enterpriseDTO);
    }

    @DeleteMapping(value = "/delete")
    public int deleteContact(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.deleteEnterprise(enterpriseDTO);
    }

}
