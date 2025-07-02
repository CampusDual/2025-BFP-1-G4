package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IEnterpriseService;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.EnterpriseUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    /*@PostMapping(value = "/add")
    public int addEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.insertEnterprise(enterpriseDTO);
    }*/

    /*@PutMapping(value = "/update")
    public int updateEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.updateEnterprise(enterpriseDTO);
    }*/

    /*@DeleteMapping(value = "/delete")
    public int deleteEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.deleteEnterprise(enterpriseDTO);
    }*/

    @PostMapping(value = "/add")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> createEnterprise(@RequestBody EnterpriseUserDTO dto) {
        enterpriseService.insertEnterprise(dto);
        return ResponseEntity.ok("Empresa y usuario creados");
    }

    @PutMapping(value = "/update/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> updateEnterprise(@PathVariable int id, @RequestBody EnterpriseDTO enterpriseDTO) {
        enterpriseService.updateEnterprise(id, enterpriseDTO);
        return ResponseEntity.ok("Empresa y usuario actualizados");
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> deleteEnterprise(@PathVariable int id) {
        if (enterpriseService.hasActiveOffers(id)) {
            return ResponseEntity.badRequest().body("Debe desactivar las ofertas antes de eliminar la empresa");
        }
        enterpriseService.deleteEnterprise(id);
        return ResponseEntity.ok("Empresa y usuario eliminados");
    }

}
