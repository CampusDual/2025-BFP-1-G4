package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.OffersDTO;

import java.util.List;

public interface IOffersService {
    //CRUD Operations
    //Puede usarse entero en vez de OffersDTO para el id
    OffersDTO queryOffer(OffersDTO offersDTO);
    List<OffersDTO> queryAllOffers();
    OffersDTO insertOffer(OffersDTO offersDTO);
}
