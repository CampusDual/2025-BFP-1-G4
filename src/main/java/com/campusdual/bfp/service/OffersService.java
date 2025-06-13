package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.Login;
import com.campusdual.bfp.model.Offers;
import com.campusdual.bfp.model.dao.EnterpriseDao;
import com.campusdual.bfp.model.dao.OffersDao;
import com.campusdual.bfp.model.dto.LoginDTO;
import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.dtomapper.EnterpriseMapper;
import com.campusdual.bfp.model.dto.dtomapper.LoginMapper;
import com.campusdual.bfp.model.dto.dtomapper.OffersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;



@Service("OffersService")
@Lazy
public class OffersService implements IOffersService {

    @Autowired
    private OffersDao offersDao;

    @Override
    public OffersDTO queryOffers(OffersDTO offersDTO) {
        Offers offers = OffersMapper.INSTANCE.toEntity(offersDTO);
        return OffersMapper.INSTANCE.toDTO(offersDao.getReferenceById(offers.getId()));
    }

    @Override
    public List<OffersDTO> queryAllOffers() {

        return OffersMapper.INSTANCE.toDTOList(offersDao.findAll());
    }
}
