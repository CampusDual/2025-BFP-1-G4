package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.OffersDTO;

import java.util.List;

public interface IOffersService {
    //CRUD Operations
    OffersDTO queryOffers(OffersDTO offersDTO);
    List<OffersDTO> queryAllOffers();
}
