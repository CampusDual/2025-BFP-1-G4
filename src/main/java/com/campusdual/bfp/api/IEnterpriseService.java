package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.EnterpriseDTO;

import java.util.List;

public interface IEnterpriseService {
    //CRUD Operations
    EnterpriseDTO queryEnterprise(EnterpriseDTO enterpriseDTO);

    List<EnterpriseDTO> queryAllEnterprise();

    int insertEnterprise(EnterpriseDTO enterpriseDTO);

    int updateEnterprise(EnterpriseDTO enterpriseDTO);

    int deleteEnterprise(EnterpriseDTO enterpriseDTO);
}
