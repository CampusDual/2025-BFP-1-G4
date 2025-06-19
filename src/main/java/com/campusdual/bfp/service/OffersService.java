package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dao.OffersDao;
import com.campusdual.bfp.model.dao.UserDao;
import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.dtomapper.OffersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;



@Service("OffersService")
@Lazy
public class OffersService implements IOffersService {

    @Autowired
    private OffersDao offersDao;

    @Autowired
    private UserDao userDao;

    @Override
    public OffersDTO queryOffer(OffersDTO offersDTO) {
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        return OffersMapper.INSTANCE.toDTO(offersDao.getReferenceById(offer.getId()));
    }

    @Override
    public List<OffersDTO> queryAllOffers() {
        return OffersMapper.INSTANCE.toDTOList(offersDao.findAll());
    }

    @Override
    public OffersDTO insertOffer(OffersDTO offersDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("User: " + auth.getName() + " is querying all offers.");
        User user = userDao.findByLogin(auth.getName());
        offersDTO.setEnterpriseId(user.getEnterpriseId());
        offersDTO.setPublicationDate(new Date());
        offersDTO.setActive(true);
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        offersDao.saveAndFlush(offer);
        return OffersMapper.INSTANCE.toDTO(offer);
    }

    @Override
    public List<OffersDTO> findOffersByEnterpriseId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.findByLogin(auth.getName());
        Integer enterpriseId = user.getEnterpriseId();
        return OffersMapper.INSTANCE.toDTOList(offersDao.findAllByEnterpriseId(enterpriseId));
    }

    @Override
    public OffersDTO toggleActive(OffersDTO offersDTO) {
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        Offer entity = offersDao.getReferenceById(offer.getId());
        entity.setActive(!entity.isActive());
        offersDao.saveAndFlush(entity);
        return OffersMapper.INSTANCE.toDTO(entity);
    }

}
