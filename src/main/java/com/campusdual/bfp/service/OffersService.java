package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IOffersService;
import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dao.InscriptionsDao;
import com.campusdual.bfp.model.dao.EnterpriseDao;
import com.campusdual.bfp.model.dao.OffersDao;
import com.campusdual.bfp.model.dao.UserDao;
import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dto.dtomapper.OffersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service("OffersService")
@Lazy
public class OffersService implements IOffersService {

    @Autowired
    private OffersDao offersDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private InscriptionsDao inscriptionsDao;

    @Autowired
    private EnterpriseDao enterpriseDao;

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
    public OffersDTO insertOffer(OffersDTO offersDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.findByLogin(auth.getName());
        Enterprise enterprise = user.getEnterprise();
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        offer.setEnterprise(enterprise);
        offer.setPublicationDate(new Date());
        offer.setActive(true);
        offer.setRequirements(offer.getRequirements());
        offer.setModality(offer.getModality());
        offer.setLinkedin(offer.getLinkedin());
        offer.setConditions(offer.getConditions());
        offersDao.saveAndFlush(offer);
        return convertToDTO(offer);
    }

    @Override
    public List<OffersDTO> findOffersByEnterpriseIdOrderByPublicationDateDesc() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.findByLogin(auth.getName());
        Integer enterpriseId = user.getEnterprise().getId();
        return OffersMapper.INSTANCE.toDTOList(offersDao.findAllByEnterpriseIdOrderByPublicationDateDesc(enterpriseId));
    }

    @Override
    public List<OffersDTO> findAllByActiveOffersOrderByPublicationDateDesc() {
        List<Offer> offers = offersDao.findByActiveOrderByPublicationDateDesc(true);
        return offers.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OffersDTO toggleActive(OffersDTO offersDTO) {
        Offer offer = OffersMapper.INSTANCE.toEntity(offersDTO);
        Offer entity = offersDao.getReferenceById(offer.getId());
        entity.setActive(!entity.isActive());
        offersDao.saveAndFlush(entity);
        return OffersMapper.INSTANCE.toDTO(entity);
    }

    @Override
    public int userApplyOffer(Integer offerId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userDao.findByLogin(auth.getName());
        if (user == null) throw new RuntimeException("Usuario no encontrado");
        Offer offer = offersDao.getReferenceById(offerId);
        if (inscriptionsDao.existsByUserIdAndOfferId(user.getId(), offer.getId())) {
            throw new RuntimeException("Ya has aplicado a esta oferta");
        }
        Inscriptions inscriptions = new Inscriptions();
        inscriptions.setUser(user);
        inscriptions.setOffer(offer);
        inscriptions.setInscriptiondate(new Date());
        inscriptions.setStatus("pendiente");
        inscriptionsDao.saveAndFlush(inscriptions);
        return offer.getId();
    }

    @Override
    public OffersDTO updateOffer(OffersDTO offer) {
        Optional<Offer> offerEntityOpt = offersDao.findById(offer.getId());

        if (offerEntityOpt.isEmpty()) {
            throw new RuntimeException("Oferta no encontrada con id " + offer.getId());
        }
        Offer offerEntity = offerEntityOpt.get();
        offerEntity.setTitle(offer.getTitle());
        offerEntity.setDescription(offer.getDescription());
        offerEntity.setPublicationDate(offer.getPublicationDate());
        offerEntity.setActive(offer.isActive());
        offerEntity.setRequirements(offer.getRequirements());
        offerEntity.setModality(offer.getModality());
        offerEntity.setLinkedin(offer.getLinkedin());
        offerEntity.setConditions(offer.getConditions());
        Enterprise enterprise = enterpriseDao.getReferenceById(offer.getEnterpriseId());
        offerEntity.setEnterprise(enterprise);
        Offer savedOffer = offersDao.save(offerEntity);
        return convertToDTO(savedOffer);
    }

    @Override
    public OffersDTO findOfferById(int id) {
        Optional<Offer> offerEntityOpt = offersDao.findById(id);
        if (offerEntityOpt.isPresent()) {
            Offer offerEntity = offerEntityOpt.get();
            OffersDTO offerDTO = convertToDTO(offerEntity);
            return offerDTO;
        } else {
            return null; // No encontrada
        }
    }

    private OffersDTO convertToDTO(Offer entity) {
        OffersDTO dto = new OffersDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setPublicationDate(entity.getPublicationDate());
        dto.setActive(entity.isActive());
        dto.setRequirements(entity.getRequirements());
        dto.setModality(entity.getModality());
        dto.setLinkedin(entity.getLinkedin());
        dto.setConditions(entity.getConditions());
        if (entity.getEnterprise() != null) {
            dto.setEnterpriseId(entity.getEnterprise().getId());
            dto.setEnterpriseName(entity.getEnterprise().getName());
            dto.setEnterpriseEmail(entity.getEnterprise().getEmail());
        }
        return dto;
    }

    @Override
    public List<UserDTO> getUsersByOfferId(Integer offerId) {
        List<User> users = inscriptionsDao.findUsersByOfferId(offerId);
        return users.stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setSurname1(user.getSurname1());
            dto.setSurname2(user.getSurname2());
            dto.setEmail(user.getEmail());
            dto.setPhonenumber(user.getPhonenumber());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OffersDTO> findOffersByUserId(Integer userId) {
        List<Offer> offers = inscriptionsDao.findOffersByUserId(userId);
        return offers.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

}
