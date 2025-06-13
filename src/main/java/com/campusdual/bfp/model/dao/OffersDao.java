package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.Offers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OffersDao extends JpaRepository<Offers, Integer>{
    //search enterprise by id
    //query all by enterprise id
    List<Offers> findAllByEnterpriseId(Integer enterpriseId);
}
