package com.campusdual.bfp.model.dao;


import com.campusdual.bfp.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactDao extends JpaRepository<Contact, Integer> {
}
