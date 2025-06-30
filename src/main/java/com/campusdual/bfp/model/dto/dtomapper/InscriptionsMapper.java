package com.campusdual.bfp.model.dto.dtomapper;

import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface InscriptionsMapper {
    InscriptionsMapper INSTANCE = Mappers.getMapper(InscriptionsMapper.class);
    Inscriptions toEntity(InscriptionsDTO inscriptionsDTO);
    List<Inscriptions> toDTOList(List<Inscriptions> inscriptions);
    InscriptionsDTO toDTO(Inscriptions inscriptions);
}
