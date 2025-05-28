package com.campusdual.bfp.controller;


import com.campusdual.bfp.api.IContactService;
import com.campusdual.bfp.model.dto.ContactDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/contacts")
public class ContactsController {

    @Autowired
    private IContactService contactService;

    @GetMapping(value = "/testController")
    public String testContactsController() {
        return "Contacts controller works!";
    }

    @PostMapping(value = "/get")
    public ContactDTO queryContact(@RequestBody ContactDTO contactDTO) {
        return contactService.queryContact(contactDTO);
    }

    @GetMapping(value = "/getAll")
    public List<ContactDTO> queryAllContact() {
        return contactService.queryAllContact();
    }

    @PostMapping(value = "/add")
    public int addContact(@RequestBody ContactDTO contactDTO) {
        return contactService.insertContact(contactDTO);
    }

    @PutMapping(value = "/update")
    public int updateContact(@RequestBody ContactDTO contactDTO) {
        return contactService.updateContact(contactDTO);
    }

    @DeleteMapping(value = "/delete")
    public int deleteContact(@RequestBody ContactDTO contactDTO) {
        return contactService.deleteContact(contactDTO);
    }
}
