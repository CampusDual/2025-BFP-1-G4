package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.dto.OffersDTO;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping( "/add")
    public OffersDTO addOffer(@RequestBody OffersDTO offer) {
        return offersService.insertOffer(offer);
    }

    @GetMapping("/test")
    public String allAccess() {
        return "Controller words";
    }

    @GetMapping("/byEnterprise")
    public List<OffersDTO> findOffersByEnterpriseId() {
        return offersService.findOffersByEnterpriseId();
    }

    @GetMapping("/findAllByActive")
    public List<OffersDTO> getAllActiveOffers() {
        return offersService.findAllByActiveOffers();
    }

    @PutMapping("/toggleActive")
    public OffersDTO toggleActive(@RequestBody OffersDTO offersDTO) {
        return offersService.toggleActive(offersDTO);
    }

}



