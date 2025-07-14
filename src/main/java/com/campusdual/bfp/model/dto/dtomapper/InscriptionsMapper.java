package com.campusdual.bfp.model.dto.dtomapper;

import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InscriptionsMapper {
    InscriptionsMapper INSTANCE = Mappers.getMapper(InscriptionsMapper.class);

    @Mapping(source = "offerId", target = "offer.id")
    @Mapping(source = "userId", target = "user.id")
    Inscriptions toEntity(InscriptionsDTO inscriptionsDTO);

    @Mapping(source = "offer.id", target = "offerId", qualifiedByName = "idOfferToOffer")
    @Mapping(source = "user.id", target = "userId", qualifiedByName = "idUserToUser")
    List<InscriptionsDTO> toDTOList(List<Inscriptions> inscriptions);
    InscriptionsDTO toDTO(Inscriptions inscriptions);

    @Named("idOfferToOffer")
    default Offer idOfferToOffer(Integer offerId) {
        if (offerId == null) {
            return null;
        }
        Offer offer = new Offer();
        offer.setId(offerId);
        return offer;
    }

    @Named("idUserToUser")
    default User idUserToUser(Integer userId) {
        if (userId == null) {
            return null;
        }
        User user = new User();
        user.setId(userId);
        return user;
    }
}
