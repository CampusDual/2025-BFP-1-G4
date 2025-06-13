package com.campusdual.bfp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("LoginService")
@Lazy
public class LoginService implements ILoginService {

    @Autowired
    private LoginDao loginDao;

    @Override
    public LoginDTO queryLogin(LoginDTO loginDTO) {
        Login login = LoginMapper.INSTANCE.toEntity(loginDTO);
        return LoginMapper.INSTANCE.toDTO(loginDao.getReferenceById(login.getId()));
    }

    @Override
    public List<LoginDTO> queryAllLogin() {
        return LoginMapper.INSTANCE.toDTOList(loginDao.findAll());
    }

    @Override
    public int insertLogin(LoginDTO loginDTO) {
        Login login = LoginMapper.INSTANCE.toEntity(loginDTO);
        loginDao.saveAndFlush(login);
        return login.getId();
    }

    @Override
    public int updateLogin(LoginDTO loginDTO) {
        return insertLogin(loginDTO);
    }

    @Override
    public int deleteLogin(LoginDTO loginDTO) {
        int log_id = loginDTO.getId();
        Login login = LoginMapper.INSTANCE.toEntity(loginDTO);
        loginDao.delete(login);
        return log_id;
    }
}
