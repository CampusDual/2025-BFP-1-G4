package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IInscriptionsService;
import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.dao.InscriptionsDao;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dto.OffersDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/inscriptions")
public class InscriptionsController {

    @Autowired
    private IInscriptionsService inscriptionsService;
    @Autowired
    private InscriptionsDao inscriptionsDao;

    @GetMapping(value = "/testController")
    public String testInscriptionsController() {
        return "Inscriptions controller works!";
    }

    @PreAuthorize("hasRole('user')")
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
    public List<UserDTO> getUsersByOffer(@PathVariable("offerid") Integer offerId) {
        return inscriptionsService.findUsersByOfferId(offerId);
    }

    @PreAuthorize("hasRole('user')")
    @GetMapping("/byUser/{userid}")
    public List<OffersDTO> getOffersByUser(@PathVariable("userid") Integer userId) {
        return inscriptionsService.findOffersByUserId(userId);
    }

    @PutMapping("/toggleActiveStatus/{id}")
    public ResponseEntity<String> toggleActiveStatus(@PathVariable Long id, @RequestBody InscriptionsDTO inscriptionsDTO) {
        String response = inscriptionsService.toggleActiveStatus(id, inscriptionsDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/byUserAndOffer")
    public ResponseEntity<?> getInscripcionPorUsuarioYOferta(
            @RequestParam Integer userId,
            @RequestParam Integer ofertaId
    ) {
        Inscriptions inscripcion = inscriptionsDao.findByUserIdAndOfferId(userId, ofertaId);

        if (inscripcion != null) {
            return ResponseEntity.ok(inscripcion);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Inscripción no encontrada"));
        }
    }


}
