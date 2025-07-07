package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Enterprise;
import com.campusdual.bfp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
    User findByLogin(String login);

    User findUserById(int userId);

    User findUserByEnterpriseId(int enterpriseId);
}
