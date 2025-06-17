package com.campusdual.bfp.model.dto.dtomapper;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.dto.OffersDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OffersMapper {
    OffersMapper INSTANCE = Mappers.getMapper(OffersMapper.class);
    OffersDTO toDTO(Offer offer);
    List<OffersDTO> toDTOList(List<Offer> offers);
    Offer toEntity(OffersDTO offersDTO);
}