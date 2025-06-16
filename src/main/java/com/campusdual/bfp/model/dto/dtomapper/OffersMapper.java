package com.campusdual.bfp.model.dto.dtomapper;
import com.campusdual.bfp.model.Offers;
import com.campusdual.bfp.model.dto.OffersDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OffersMapper {
    OffersMapper INSTANCE = Mappers.getMapper(OffersMapper.class);
    OffersDTO toDTO(Offers offers);
    List<OffersDTO> toDTOList(List<Offers> offers);
    Offers toEntity(OffersDTO offersDTO);
}