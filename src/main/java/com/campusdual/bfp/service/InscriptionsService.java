package com.campusdual.bfp.service;


import com.campusdual.bfp.model.Inscriptions;
import com.campusdual.bfp.model.dao.InscriptionsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Lazy
public class InscriptionsService {
    @Autowired
    private InscriptionsDao inscriptionsDao;


}
