package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.UserDTO;

import java.util.List;

public interface IOffersService {
    //CRUD Operations
    OffersDTO queryOffer(OffersDTO offersDTO);

    List<OffersDTO> queryAllOffers();

    OffersDTO insertOffer(OffersDTO offersDTO);

    List<OffersDTO> findOffersByEnterpriseIdOrderByPublicationDateDesc();

    int userApplyOffer(Integer offerId);

    OffersDTO toggleActive(OffersDTO offersDTO);

    List<OffersDTO> findAllByActiveOffersOrderByPublicationDateDesc();

    OffersDTO updateOffer(OffersDTO offer);

    OffersDTO findOfferById(int id);


    List<UserDTO> getUsersByOfferId(Integer offerId);

    List<OffersDTO> findOffersByUserId(Integer userId);

    List<OffersDTO> findActiveOffersByTitleOrDescription(String searchText);
}