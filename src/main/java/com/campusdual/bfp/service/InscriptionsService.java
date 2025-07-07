package com.campusdual.bfp.service;


import com.campusdual.bfp.api.IInscriptionsService;
import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.User;
import com.campusdual.bfp.model.dao.InscriptionsDao;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import com.campusdual.bfp.model.dto.UserDTO;
import com.campusdual.bfp.model.dto.dtomapper.InscriptionsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
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
            com.campusdual.bfp.model.dto.UserDTO dto = new com.campusdual.bfp.model.dto.UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setSurname1(user.getSurname1());
            dto.setSurname2(user.getSurname2());
            dto.setEmail(user.getEmail());
            dto.setPhonenumber(user.getPhonenumber());
            // Map other fields as necessary
            return dto;
        }).collect(Collectors.toList());
    }

}
