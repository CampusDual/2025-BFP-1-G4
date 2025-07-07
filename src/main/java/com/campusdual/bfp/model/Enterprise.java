package com.campusdual.bfp.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "enterprise")
public class Enterprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String email;

    @Column(name = "phonenumber")
    private String phonenumber;

    @Column
    private String address;

    @Column
    private boolean active = true;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<User> users;

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Offer> offers;

    public Enterprise() {
    }

    public Enterprise(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
