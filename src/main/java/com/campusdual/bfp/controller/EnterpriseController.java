package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IEnterpriseService;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dao.UserDao;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.EnterpriseUserDTO;
import com.campusdual.bfp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/enterprises")
public class EnterpriseController {
    @Autowired
    private IEnterpriseService enterpriseService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserService userService;

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

    @PutMapping(value = "/update")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<EnterpriseDTO> updateEnterprise(@RequestBody EnterpriseUserDTO dto) {
        EnterpriseDTO enterprise = enterpriseService.updateEnterprise(dto);
        return ResponseEntity.ok(enterprise);
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
