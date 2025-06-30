package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.InscriptionsDTO;

import java.util.List;

public interface IInscriptionsService {
    InscriptionsDTO queryInscriptions(InscriptionsDTO inscriptionsDTO);

    //CRUD Operations
    InscriptionsDTO insertInscriptions(InscriptionsDTO inscriptionDTO);
    List<InscriptionsDTO> queryAllInscriptions();


    //List<InscriptionsDTO> findInscriptionsByEnterpriseId();
    //List<InscriptionsDTO> findAllByActiveInscriptions();

}
