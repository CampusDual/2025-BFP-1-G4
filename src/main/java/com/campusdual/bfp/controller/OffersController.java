package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.OffersDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/offers")
public class OffersController {

    @Autowired
    private IOffersService offersService;

    @GetMapping(value = "/get")
    public OffersDTO queryOffers(@RequestBody OffersDTO offersDTO) {
        return offersService.queryOffer(offersDTO);
    }

    @GetMapping(value = "/getAll")
    public List<OffersDTO> queryAllOffers() {
        return offersService.queryAllOffers();
    }

    @PreAuthorize("hasRole('enterprise')")
    @PostMapping("/add")
    public OffersDTO addOffer(@RequestBody OffersDTO offer) {
        return offersService.insertOffer(offer);
    }

    @GetMapping("/test")
    public String allAccess() {
        return "Controller words";
    }

    @PreAuthorize("hasRole('enterprise')")
    @GetMapping("/byEnterprise")
    public List<OffersDTO> findOffersByEnterpriseId() {
        return offersService.findOffersByEnterpriseIdOrderByPublicationDateDesc();
    }

    @PreAuthorize("hasRole('enterprise')")
    @PutMapping("/toggleActive")
    public OffersDTO toggleActive(@RequestBody OffersDTO offersDTO) {
        return offersService.toggleActive(offersDTO);
    }

    @GetMapping("/findAllByActive")
    public List<OffersDTO> getAllActiveOffers() {
        return offersService.findAllByActiveOffersOrderByPublicationDateDesc();
    }

    @PreAuthorize("hasRole('user')")
    @PostMapping("/apply")
    public int userApplyOffer(@RequestBody OffersDTO offersDTO) {
        return offersService.userApplyOffer(offersDTO.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffersDTO> getOfferById(@PathVariable int id) {
        OffersDTO offer = offersService.findOfferById(id);
        if (offer != null) {
            return ResponseEntity.ok(offer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public OffersDTO updateOffer(@PathVariable int id, @RequestBody OffersDTO offer) {
        offer.setId(id);
        return offersService.updateOffer(offer);
    }

    @GetMapping("/byTitleOrDescription")
    public List<OffersDTO> findActiveOffersByTitleOrDescription(@RequestParam String searchText) {
        return offersService.findActiveOffersByTitleOrDescription(searchText);
    }

    @PreAuthorize("hasRole('enterprise')")
    @GetMapping("/enterprise/filterByText")
    public List<OffersDTO> findEnterpriseOffersByTitleOrDescription(@RequestParam String searchText) {
        return offersService.findEnterpriseOffersByTitleOrDescription(searchText);
    }

}




