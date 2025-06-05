package com.campusdual.bfp.model.dto;

public class LoginDTO {
    private Integer log_id;
    private String log_username;
    private String log_password;

    public String getLog_password() {
        return log_password;
    }

    public void setLog_password(String log_password) {
        this.log_password = log_password;
    }

    public String getLog_username() {
        return log_username;
    }

    public void setLog_username(String log_username) {
        this.log_username = log_username;
    }

    public Integer getLog_id() {
        return log_id;
    }

    public void setLog_id(Integer log_id) {
        this.log_id = log_id;
    }
}
