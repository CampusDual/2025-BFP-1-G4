package com.campusdual.bfp.service;

import com.campusdual.bfp.api.ILoginService;
import com.campusdual.bfp.model.Login;
import com.campusdual.bfp.model.dao.LoginDao;
import com.campusdual.bfp.model.dto.LoginDTO;
import com.campusdual.bfp.model.dto.dtomapper.LoginMapper;
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
        return LoginMapper.INSTANCE.toDTO(loginDao.getReferenceById(login.getLog_id()));
    }

    @Override
    public List<LoginDTO> queryAllLogin() {
        return LoginMapper.INSTANCE.toDTOList(loginDao.findAll());
    }

    @Override
    public int insertLogin(LoginDTO loginDTO) {
        Login login = LoginMapper.INSTANCE.toEntity(loginDTO);
        loginDao.saveAndFlush(login);
        return login.getLog_id();
    }

    @Override
    public int updateLogin(LoginDTO loginDTO) {
        return insertLogin(loginDTO);
    }

    @Override
    public int deleteLogin(LoginDTO loginDTO) {
        int log_id = loginDTO.getLog_id();
        Login login = LoginMapper.INSTANCE.toEntity(loginDTO);
        loginDao.delete(login);
        return log_id;
    }
}
