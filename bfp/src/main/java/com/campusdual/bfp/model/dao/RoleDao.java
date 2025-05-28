package com.campusdual.bfp.model.dao;

import com.campusdual.bfp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
