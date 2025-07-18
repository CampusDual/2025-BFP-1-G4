package com.campusdual.bfp.service;


import com.campusdual.bfp.api.IInscriptionsService;
import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.Offer;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dao.InscriptionsDao;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import com.campusdual.bfp.model.dto.OffersDTO;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dto.dtomapper.InscriptionsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Lazy
public class InscriptionsService implements IInscriptionsService {
    @Autowired
    private InscriptionsDao inscriptionsDao;

    @Autowired
    private InscriptionsMapper inscriptionsMapper;

    @Override
    public InscriptionsDTO queryInscriptions(InscriptionsDTO inscriptionsDTO) {
        Inscriptions inscriptions = InscriptionsMapper.INSTANCE.toEntity(inscriptionsDTO);
        return InscriptionsMapper.INSTANCE.toDTO(inscriptionsDao.getReferenceById(inscriptions.getId()));
    }

    @Override
    public InscriptionsDTO insertInscriptions(InscriptionsDTO inscriptionDTO) {
        return null;
    }

    @Override
    public List<InscriptionsDTO> queryAllInscriptions() {
        return InscriptionsMapper.INSTANCE.toDTOList(inscriptionsDao.findAll());
    }

    @Override
    public List<UserDTO> findUsersByOfferId(Integer offerId) {
        List<User> users = inscriptionsDao.findUsersByOfferId(offerId);
        return users.stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setSurname1(user.getSurname1());
            dto.setSurname2(user.getSurname2());
            dto.setEmail(user.getEmail());
            dto.setPhonenumber(user.getPhonenumber());
            dto.setLinkedin(user.getLinkedin());
            dto.setGithub(user.getGithub());
            dto.setPresentation(user.getPresentation());
            dto.setExperience(user.getExperience());
            dto.setDegree(user.getDegree());
            dto.setModality(user.getModality());

            Inscriptions inscription = inscriptionsDao.findByUserIdAndOfferId(user.getId(), offerId);
            if (inscription != null) {
                dto.setStatus(inscription.getStatus());
            } else {
                dto.setStatus("Not Inscribed");
            }

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OffersDTO> findOffersByUserId(Integer userId) {
        List<Offer> offers = inscriptionsDao.findOffersByUserId(userId);
        return offers.stream().map(offer -> {
            OffersDTO dto = new OffersDTO();
            dto.setId(offer.getId());
            dto.setTitle(offer.getTitle());
            dto.setDescription(offer.getDescription());
            dto.setPublicationDate(offer.getPublicationDate());
            dto.setActive(offer.isActive());
            dto.setRequirements(offer.getRequirements());
            dto.setModality(offer.getModality());
            dto.setLinkedin(offer.getLinkedin());
            dto.setConditions(offer.getConditions());
            if (offer.getEnterprise() != null) {
                dto.setEnterpriseId(offer.getEnterprise().getId());
                dto.setEnterpriseName(offer.getEnterprise().getName());
                dto.setEnterpriseEmail(offer.getEnterprise().getEmail());
            }

            Inscriptions inscription = inscriptionsDao.findByUserIdAndOfferId(userId, offer.getId());

            if (inscription != null) {
                dto.setStatus(inscription.getStatus());
            } else {
                dto.setStatus("Not Inscribed");
            }

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public String toggleActiveStatus(Long id, InscriptionsDTO inscriptionsDTO) {
        Optional<Inscriptions> optionalInscription = inscriptionsDao.findById(id);
        String status = inscriptionsDTO.getStatus();
        if (optionalInscription.isPresent()) {
            Inscriptions inscription = optionalInscription.get();
            inscription.setStatus(status);
            inscriptionsDao.saveAndFlush(inscription);
            return inscription.getStatus();
        }
        return "Inscription not found";
    }

}
