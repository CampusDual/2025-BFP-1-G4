package com.campusdual.bfp.model.dto;

public class LoginDTO {
    private Integer log_id;
    private String log_ent_id;
    private String log_password;

    public String getLog_password() {
        return log_password;
    }

    public void setLog_password(String log_password) {
        this.log_password = log_password;
    }

    public String getLog_ent_id() {
        return log_ent_id;
    }

    public void setLog_ent_id(String log_ent_id) {
        this.log_ent_id = log_ent_id;
    }

    public Integer getLog_id() {
        return log_id;
    }

    public void setLog_id(Integer log_id) {
        this.log_id = log_id;
    }
}
