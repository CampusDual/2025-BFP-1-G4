package com.campusdual.bfp.model.dto;

public class EnterpriseUserDTO {
    private EnterpriseDTO enterprise;
    private String login;
    private String password;

    public EnterpriseDTO getEnterprise() { return enterprise; }
    public void setEnterprise(EnterpriseDTO enterprise) { this.enterprise = enterprise; }
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}