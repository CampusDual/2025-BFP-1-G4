package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.InscriptionsDTO;

import java.util.List;

public interface IInscriptionsService {
    //CRUD Operations
    InscriptionsDTO insertInscriptions(InscriptionsDTO inscriptionDTO);
    List<InscriptionsDTO> queryAllInscriptions();


    //List<InscriptionsDTO> findInscriptionsByEnterpriseId();
    //List<InscriptionsDTO> findAllByActiveInscriptions();

}
