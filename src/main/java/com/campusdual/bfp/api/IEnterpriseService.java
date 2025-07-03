package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.EnterpriseUserDTO;

import java.util.List;

public interface IEnterpriseService {
    //CRUD Operations
    EnterpriseDTO queryEnterprise(EnterpriseDTO enterpriseDTO);

    List<EnterpriseDTO> queryAllEnterprise();

    int insertEnterprise(EnterpriseUserDTO enterpriseUserDTO);

    int updateEnterprise(Integer id, EnterpriseDTO enterpriseDTO);

    int deleteEnterprise(Integer id);

    boolean hasActiveOffers(int id);

    List<EnterpriseDTO> findAllByActive();

    EnterpriseDTO toggleActive(EnterpriseDTO enterpriseDTO);
}
