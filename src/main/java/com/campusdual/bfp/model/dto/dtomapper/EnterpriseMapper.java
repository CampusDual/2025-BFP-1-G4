package com.campusdual.bfp.model.dto.dtomapper;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface EnterpriseMapper {
    EnterpriseMapper INSTANCE = Mappers.getMapper(EnterpriseMapper.class);

    EnterpriseDTO toDTO(Enterprise enterprise);
    List<EnterpriseDTO>toDTOList(List<Enterprise> enterprises);
    Enterprise toEntity(EnterpriseDTO enterpriseDTO);
}
