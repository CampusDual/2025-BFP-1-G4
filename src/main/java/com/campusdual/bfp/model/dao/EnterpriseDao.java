package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnterpriseDao extends JpaRepository<Enterprise, Integer> {
    List<Enterprise> findAllByActiveTrue();
}
