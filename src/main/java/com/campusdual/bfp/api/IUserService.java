package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.UserDTO;

import java.util.List;

public interface IUserService {

    UserDTO queryUser(UserDTO userDTO);

    List<UserDTO> queryAllUsers();

    int addUser(UserDTO userDTO);

    int updateUser(UserDTO userDTO);

    int updateUserProfile(UserDTO userDTO);

    int deleteUser(UserDTO userDTO);

    UserDTO getUserProfile(UserDTO userDTO);
}
