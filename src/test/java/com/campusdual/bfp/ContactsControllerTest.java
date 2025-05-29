package com.campusdual.bfp;

import com.campusdual.bfp.controller.ContactsController;
import com.campusdual.bfp.model.Contact;

import com.campusdual.bfp.model.dao.ContactDao;
import com.campusdual.bfp.model.dto.ContactDTO;
import com.campusdual.bfp.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ContactsControllerTest {

    private MockMvc mockMvc;
    @InjectMocks
    ContactsController contactsController;

    @Mock
    ContactService contactService;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(contactsController)
                .build();
    }

    @Test
    void addContactTest() throws Exception {
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/contacts/add").contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(new Contact("John"))))
                .andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
    }

    @Test
    void getAllContactsTest() throws Exception {
        List<ContactDTO> contactsList = new ArrayList<ContactDTO>();

        ContactDTO contactOne = new ContactDTO();
        ContactDTO contactTwo = new ContactDTO();
        ContactDTO contactThree = new ContactDTO();

        contactsList.add(contactOne);
        contactsList.add(contactTwo);
        contactsList.add(contactThree);

        when(this.contactService.queryAllContact()).thenReturn(contactsList);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/contacts/getAll").accept(MediaType.APPLICATION_JSON)).andReturn();

        assertEquals(200, mvcResult.getResponse().getStatus());
        List<ContactDTO> result = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), List.class);
        assertEquals(3, result.size());
    }

}
