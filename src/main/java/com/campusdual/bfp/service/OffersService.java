package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.dao.OffersDao;
import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.dtomapper.OffersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;



@Service("OffersService")
@Lazy
public class OffersService implements IOffersService {

    @Autowired
    private OffersDao offersDao;

    @Override
    public OffersDTO queryOffer(OffersDTO offersDTO) {
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        return OffersMapper.INSTANCE.toDTO(offersDao.getReferenceById(offer.getId()));
    }

    @Override
    public List<OffersDTO> queryAllOffers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("User: " + auth.getName() + " is querying all offers.");
        return OffersMapper.INSTANCE.toDTOList(offersDao.findAll());
    }

    @Override
    public OffersDTO insertOffer(OffersDTO offersDTO){
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        offersDao.saveAndFlush(offer);
        return OffersMapper.INSTANCE.toDTO(offer);
    }

}
