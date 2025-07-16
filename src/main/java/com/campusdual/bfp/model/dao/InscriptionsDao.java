package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InscriptionsDao extends JpaRepository<Inscriptions, Long> {
    int countByOfferId(Integer offerId);
    @Query("SELECT i.user.id FROM Inscriptions i WHERE i.offer.id = :offerId")
    List<Integer> findUserIdsByOfferId(@Param("offerId") Integer offerId);
    Inscriptions findByUserIdAndOfferId(Integer userId, Integer offerId); // ✅ correcto orden

    Inscriptions getReferenceByOfferIdAndUserId(Integer offerId, Integer userId);
    void deleteInscriptionByOffer(Offer offer);

    boolean existsByUserIdAndOfferId(Integer id, Integer id1);

    @Query("SELECT i.user FROM Inscriptions i WHERE i.offer.id = :offerId")
    List<User> findUsersByOfferId(@Param("offerId") Integer offerId);

    @Query("SELECT i.offer FROM Inscriptions i WHERE i.user.id = :userId")
    List<Offer> findOffersByUserId(@Param("userId") Integer userId);
}
