package com.campusdual.bfp.model;

import javax.persistence.*;

@Entity
@Table(name = "enterprise")
public class Enterprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ent_id;

    @Column
    private String ent_name;

    @Column
    private String ent_email;

    @Column
    private String ent_phoneNumber;

    @Column
    private String ent_address;

    public Enterprise() {
    }

    public Enterprise(String ent_name) {
        this.ent_name = ent_name;
    }

    public Integer getEnt_id() {
        return ent_id;
    }

    public void setEnt_id(Integer ent_id) {
        this.ent_id = ent_id;
    }

    public String getEnt_name() {
        return ent_name;
    }

    public void setEnt_name(String ent_name) {
        this.ent_name = ent_name;
    }

    public String getEnt_email() {
        return ent_email;
    }

    public void setEnt_email(String ent_email) {
        this.ent_email = ent_email;
    }

    public String getEnt_phoneNumber() {
        return ent_phoneNumber;
    }

    public void setEnt_phoneNumber(String ent_phoneNumber) {
        this.ent_phoneNumber = ent_phoneNumber;
    }

    public String getEnt_address() {
        return ent_address;
    }

    public void setEnt_address(String ent_address) {
        this.ent_address = ent_address;
    }
}
