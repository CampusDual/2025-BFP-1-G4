package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InscriptionsDao extends JpaRepository<Inscriptions, Long> {
    boolean existsByOfferIdAndUserId(Integer offerId, Integer userId);
    int countByOfferId(int offerId);
    @Query("SELECT i.user.id FROM Inscriptions i WHERE i.offer.id = :offerId")
    List<Integer> findUserIdsByOfferId(@Param("offerId") int offerId);
    Inscriptions findByUserIdAndOfferId(Integer offerId, Integer userId);
    Inscriptions getReferenceByOfferIdAndUserId();
    void deleteInscriptionByOffer(Offer offer);

    Inscriptions getReferenceById();

    boolean existsByUserIdAndOfferId(int id, Integer id1);
}
