package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.Offers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OffersDao extends JpaRepository<Offers, Integer>{
}
