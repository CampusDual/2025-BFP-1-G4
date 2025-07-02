package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IInscriptionsService;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import com.campusdual.bfp.model.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/inscriptions")
public class InscriptionsController {

    @Autowired
    private IInscriptionsService inscriptionsService;

    @GetMapping(value = "/testController")
    public String testInscriptionsController() {
        return "Inscriptions controller works!";
    }

    @PostMapping("/add")
    public InscriptionsDTO addInscription(@RequestBody InscriptionsDTO inscription) {
    return inscriptionsService.insertInscriptions(inscription);
    }

    @GetMapping("/getAll")
    public List<InscriptionsDTO> queryAllInscriptions() {
    return inscriptionsService.queryAllInscriptions();
    }

    @PreAuthorize("hasRole('enterprise')")
    @GetMapping("/byOffer/{offerid}")
    public List<UserDTO> getUsersByOffer(@PathVariable Integer offerId) {
        return inscriptionsService.findUsersByOfferId(offerId);
    }
}
