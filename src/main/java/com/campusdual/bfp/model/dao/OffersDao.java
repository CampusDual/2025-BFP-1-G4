package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OffersDao extends JpaRepository<Offer, Integer>{

    //query all by enterprise id
    List<Offer> findAllByEnterpriseId(Integer enterpriseId);

    List<Offer> findAllByActive(Boolean active);
}
