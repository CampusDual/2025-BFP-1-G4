package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginDao extends JpaRepository<Login, Integer> {
}
