package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.OffersDTO;

import java.util.List;

public interface IOffersService {
    //CRUD Operations
    OffersDTO queryOffer(OffersDTO offersDTO);

    List<OffersDTO> queryAllOffers();

    OffersDTO insertOffer(OffersDTO offersDTO);

    List<OffersDTO> findOffersByEnterpriseId();

    int userApplyOffer(int offerId);

    OffersDTO toggleActive(OffersDTO offersDTO);

    List<OffersDTO> findAllByActiveOffers();

    int userApplyOffer(int offerId, String login);
}
