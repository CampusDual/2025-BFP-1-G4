package com.campusdual.bfp.model.dto.dtomapper;

import com.campusdual.bfp.model.Inscriptions;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InscriptionsMapper {
    InscriptionsMapper INSTANCE = Mappers.getMapper(InscriptionsMapper.class);
}
