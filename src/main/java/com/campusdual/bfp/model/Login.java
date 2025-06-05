package com.campusdual.bfp.model;

import javax.persistence.*;

@Entity
@Table(name = "login")
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer log_id;

    @Column
    private String log_username;

    @Column
    private String log_password;


    public Login() {
    }

    public Login(String log_username, String log_password) {
        this.log_username = log_username;
        this.log_password = log_password;
    }

    public Integer getLog_id() {
        return log_id;
    }

    public void setLog_id(Integer log_id) {
        this.log_id = log_id;
    }

    public String getLog_username() {
        return log_username;
    }

    public void setLog_username(String log_username) {
        this.log_username = log_username;
    }

    public String getLog_password() {
        return log_password;
    }

    public void setLog_password(String log_password) {
        this.log_password = log_password;
    }

}
