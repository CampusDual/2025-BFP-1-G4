package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.OffersDTO;

import java.util.List;

public interface IOffersService {
    //CRUD Operations
    OffersDTO queryOffer(OffersDTO offersDTO);

    List<OffersDTO> queryAllOffers();

    OffersDTO insertOffer(OffersDTO offersDTO);

    List<OffersDTO> findOffersByEnterpriseIdOrderById();


    int userApplyOffer(Integer offerId);

    OffersDTO toggleActive(OffersDTO offersDTO);

    List<OffersDTO> findAllByActiveOffersOrderById();

    int userApplyOffer(Integer offerId, String login);
}
