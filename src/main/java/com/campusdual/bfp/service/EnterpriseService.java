package com.campusdual.bfp.service;

import com.campusdual.bfp.api.IEnterpriseService;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.dao.EnterpriseDao;
import com.campusdual.bfp.model.dto.EnterpriseDTO;
import com.campusdual.bfp.model.dto.dtomapper.EnterpriseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("EnterpriseService")
@Lazy
public class EnterpriseService implements IEnterpriseService {

    @Autowired
    private EnterpriseDao enterpriseDao;

    @Override
    public EnterpriseDTO queryEnterprise(EnterpriseDTO enterpriseDTO) {
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        return EnterpriseMapper.INSTANCE.toDTO(enterpriseDao.getReferenceById(enterprise.getId()));
    }

    @Override
    public List<EnterpriseDTO> queryAllEnterprise() {
        return EnterpriseMapper.INSTANCE.toDTOList(enterpriseDao.findAll());
    }

    @Override
    public int insertEnterprise(EnterpriseDTO enterpriseDTO) {
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        enterpriseDao.saveAndFlush(enterprise);
        return enterprise.getId();
    }

    @Override
    public int updateEnterprise(EnterpriseDTO enterpriseDTO) {
        return insertEnterprise(enterpriseDTO);
    }

    @Override
    public int deleteEnterprise(EnterpriseDTO enterpriseDTO) {
        int id = enterpriseDTO.getId();
        Enterprise enterprise = EnterpriseMapper.INSTANCE.toEntity(enterpriseDTO);
        enterpriseDao.delete(enterprise);
        return id;
    }
}