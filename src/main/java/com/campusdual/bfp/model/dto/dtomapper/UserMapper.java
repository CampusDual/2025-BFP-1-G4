package com.campusdual.bfp.model.dto.dtomapper;

import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDTO(User user);
    List<UserDTO>toDTOList(List<User> users);
    User toEntity(UserDTO userDTO);
}
