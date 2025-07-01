package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OffersDao extends JpaRepository<Offer, Integer>{
    //search enterprise by id
    //query all by enterprise id
    List<Offer> findAllByEnterpriseIdOrderById(Integer enterpriseId);
    List<Offer> findByActiveOrderById(boolean active);
}
