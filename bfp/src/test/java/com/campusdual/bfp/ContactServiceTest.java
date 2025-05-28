package com.campusdual.bfp;

import com.campusdual.bfp.model.Contact;
import com.campusdual.bfp.model.dao.ContactDao;
import com.campusdual.bfp.model.dto.ContactDTO;
import com.campusdual.bfp.model.dto.dtomapper.ContactMapper;
import com.campusdual.bfp.service.ContactService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    ContactDao contactDao;

    @InjectMocks
    ContactService contactService;

    @Test
    void getAllContactsTest() {
        List<Contact> contactsList = new ArrayList<Contact>();


        Contact contactOne = new Contact("One");
        Contact contactTwo = new Contact("Two");
        Contact contactThree = new Contact("Three");

        contactsList.add(contactOne);
        contactsList.add(contactTwo);
        contactsList.add(contactThree);

        when(this.contactDao.findAll()).thenReturn(contactsList);

        List<ContactDTO> empList = this.contactService.queryAllContact();

        verify(this.contactDao, times(1)).findAll();
        assertEquals(3, empList.size());
    }

    @Test
    void getOneContactTest() {
        Contact contact = new Contact();
        contact.setId(1);

        when(this.contactDao.getReferenceById(1)).thenReturn(contact);

        ContactDTO contactDTO = new ContactDTO();
        contactDTO.setId(1);

        ContactDTO contactResult = this.contactService.queryContact(contactDTO);

        assertNotNull(contactResult);
    }

    @Test
    void contactNotPresentInDb() {
        when(this.contactDao.getReferenceById(1)).thenReturn(null);

        ContactDTO contactDTO = new ContactDTO();
        contactDTO.setId(1);

        assertNull(this.contactService.queryContact(contactDTO));

    }

    @Test
    void addContactTest() {
        Contact contact = new Contact();
        contact.setId(1);
        contact.setName("One");
        contact.setSurname1("Surname1One");
        contact.setSurname2("Surname2One");
        contact.setPhone("666555444");
        contact.setEmail("contact-one@gmail.com");

        ContactDTO createContactDTO = ContactMapper.INSTANCE.toDTO(contact);

        when(this.contactDao.saveAndFlush(any(Contact.class))).thenReturn(contact);
        Integer contactInsertedId = this.contactService.insertContact(createContactDTO);

        verify(this.contactDao, times(0)).findAll();
        verify(this.contactDao, times(1)).saveAndFlush(any(Contact.class));
        assertNotNull(contactInsertedId);
        assertEquals(1, contactInsertedId);
    }

    @Test
    void editContactTest() {
        Contact contact = new Contact();
        contact.setId(1);
        contact.setName("One");
        contact.setSurname1("Surname1One");
        contact.setSurname2("Surname2One");
        contact.setPhone("666555444");
        contact.setEmail("contact-one@gmail.com");

        ContactDTO editContactDTO = ContactMapper.INSTANCE.toDTO(contact);

        when(this.contactDao.saveAndFlush(any(Contact.class))).thenReturn(contact);

        Integer editContactId = this.contactService.updateContact(editContactDTO);

        assertNotNull(editContactId);
        assertEquals(1, editContactId);
    }

    @Test
    void deleteContactTest() {
        Contact contact = new Contact();
        contact.setId(1);
        contact.setName("One");
        contact.setSurname1("Surname1One");
        contact.setSurname2("Surname2One");
        contact.setPhone("666555444");
        contact.setEmail("contact-one@gmail.com");

        ContactDTO editContactDTO = ContactMapper.INSTANCE.toDTO(contact);

        Integer deleteContactId = this.contactService.deleteContact(editContactDTO);

        assertNotNull(deleteContactId);
    }
}
