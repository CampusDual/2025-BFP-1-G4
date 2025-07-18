package com.campusdual.bfp.model.dto;

public class UserDTO {
    public String Laboral;
    private Integer id;
    private String name;
    private String password;
    private String email;
    private String phonenumber;
    private String surname1;
    private String surname2;
    private Integer enterpriseid;
    private String login;
    private String degree;
    private String experience;
    private String modality;
    private String presentation;
    private String github;
    private String linkedin;
    private String status;


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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getSurname1() {
        return surname1;
    }

    public void setSurname1(String surname1) {
        this.surname1 = surname1;
    }

    public String getSurname2() {
        return surname2;
    }

    public void setSurname2(String surname2) {
        this.surname2 = surname2;
    }

    public Integer getEnterpriseid() { return enterpriseid; }

    public void setEnterpriseid(Integer enterpriseid) { this.enterpriseid = enterpriseid; }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getDegree() { return degree; }

    public void setDegree(String degree) { this.degree = degree; }

    public String getExperience() { return experience; }

    public void setExperience(String experience) { this.experience = experience; }

    public String getModality() { return modality; }

    public void setModality(String modality) { this.modality = modality; }

    public String getPresentation() { return presentation; }

    public void setPresentation(String presentation) { this.presentation = presentation; }

    public String getGithub() { return github; }

    public void setGithub(String github) { this.github = github; }

    public String getLinkedin() { return linkedin; }

    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLaboral() { return Laboral; }

    public void setLaboral(String laboral) { this.Laboral = laboral; }
}
