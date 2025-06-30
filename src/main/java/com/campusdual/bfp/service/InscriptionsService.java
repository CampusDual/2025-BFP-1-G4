package com.campusdual.bfp.service;


import com.campusdual.bfp.api.IInscriptionsService;
import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.dao.InscriptionsDao;
import com.campusdual.bfp.model.dto.InscriptionsDTO;
import com.campusdual.bfp.model.dto.dtomapper.InscriptionsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
