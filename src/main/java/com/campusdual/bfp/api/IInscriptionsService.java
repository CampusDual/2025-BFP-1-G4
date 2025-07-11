package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.InscriptionsDTO;
import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.UserDTO;

import java.util.List;

public interface IInscriptionsService {
    InscriptionsDTO queryInscriptions(InscriptionsDTO inscriptionsDTO);

    //CRUD Operations
    InscriptionsDTO insertInscriptions(InscriptionsDTO inscriptionDTO);
    List<InscriptionsDTO> queryAllInscriptions();

    List<UserDTO> findUsersByOfferId(Integer offerId);

    List<OffersDTO> findOffersByUserId(Integer userId);

    String toggleActiveStatus(Long id, InscriptionsDTO inscriptionsDTO);
}
