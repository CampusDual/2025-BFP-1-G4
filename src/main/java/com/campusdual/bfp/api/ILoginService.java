package com.campusdual.bfp.api;

import com.campusdual.bfp.model.dto.LoginDTO;

import java.util.List;

public interface ILoginService {

    LoginDTO queryLogin(LoginDTO loginDTO);

    List<LoginDTO> queryAllLogin();

    int insertLogin(LoginDTO loginDTO);

    int updateLogin(LoginDTO loginDTO);

    int deleteLogin(LoginDTO loginDTO);
}
