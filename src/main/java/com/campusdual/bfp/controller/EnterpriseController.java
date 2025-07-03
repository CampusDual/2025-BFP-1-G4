package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IEnterpriseService;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.EnterpriseUserDTO;
import com.campusdual.bfp.model.dto.OffersDTO;
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

    @PostMapping(value = "/add")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> createEnterprise(@RequestBody EnterpriseUserDTO dto) {
        enterpriseService.insertEnterprise(dto);
        return ResponseEntity.ok("Empresa creada");
    }

    @PutMapping(value = "/update/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> updateEnterprise(@PathVariable int id, @RequestBody EnterpriseDTO enterpriseDTO) {
        enterpriseService.updateEnterprise(id, enterpriseDTO);
        return ResponseEntity.ok("Empresa actualizados");
    }

    @DeleteMapping(value = "/delete")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> deleteEnterprise(@RequestBody EnterpriseDTO enterpriseDTO) {
        if (enterpriseService.hasActiveOffers(enterpriseDTO.getId())) {
            return ResponseEntity.badRequest().body("Debe desactivar las ofertas antes de eliminar la empresa");
        }
        enterpriseService.deleteEnterprise(enterpriseDTO.getId());
        return ResponseEntity.ok("Empresa eliminados");
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/toggleActive")
    public EnterpriseDTO toggleActive(@RequestBody EnterpriseDTO enterpriseDTO) {
        return enterpriseService.toggleActive(enterpriseDTO);
    }

    @GetMapping("/findAllByActive")
    @PreAuthorize("hasRole('admin')")
    public List<EnterpriseDTO> findAllByActive() {
        return enterpriseService.findAllByActive();
    }

}
