package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InscriptionsDao extends JpaRepository<Inscriptions, Long> {
    int countByOfferId(Integer offerId);
    @Query("SELECT i.user.id FROM Inscriptions i WHERE i.offer.id = :offerId")
    List<Integer> findUserIdsByOfferId(@Param("offerId") Integer offerId);
    Inscriptions findByUserIdAndOfferId(Integer offerId, Integer userId);
    Inscriptions getReferenceByOfferIdAndUserId(Integer offerId, Integer userId);
    void deleteInscriptionByOffer(Offer offer);

    boolean existsByUserIdAndOfferId(Integer id, Integer id1);

    @Query("SELECT i.user FROM Inscriptions i WHERE i.offer.id = :offerId")
    List<User> findUsersByOfferId(@Param("offerId") Integer offerId);

}
