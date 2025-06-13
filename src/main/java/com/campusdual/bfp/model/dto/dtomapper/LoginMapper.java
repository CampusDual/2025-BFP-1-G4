package com.campusdual.bfp.model.dto.dtomapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface LoginMapper {
    LoginMapper INSTANCE = Mappers.getMapper(LoginMapper.class);
    LoginDTO toDTO(Login login);
    List<LoginDTO> toDTOList(List<Login> logins);
    Login toEntity(LoginDTO loginDTO);
}