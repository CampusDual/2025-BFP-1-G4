package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IInscriptionsService;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import org.springframework.beans.factory.annotation.Autowired;
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

}
