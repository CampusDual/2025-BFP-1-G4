package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OffersDao extends JpaRepository<Offer, Integer>{
    //search enterprise by id
    //query all by enterprise id
    List<Offer> findAllByEnterpriseIdOrderByPublicationDateDesc(Integer enterpriseId);
    List<Offer> findByActiveOrderByPublicationDateDesc(boolean active);
    @Query("SELECT COUNT(o) FROM Offer o WHERE o.enterprise.id = :enterpriseId AND o.active = true")
    int countActiveOffersByEnterpriseId(@Param("enterpriseId") int enterpriseId);

    List<Offer> findByTitleContainingIgnoreCase(String title);
}
