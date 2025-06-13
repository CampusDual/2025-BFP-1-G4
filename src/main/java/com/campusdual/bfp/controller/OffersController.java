package com.campusdual.bfp.controller;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.dto.OffersDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        }



