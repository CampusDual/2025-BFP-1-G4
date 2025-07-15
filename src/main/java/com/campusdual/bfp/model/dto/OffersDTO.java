package com.campusdual.bfp.model.dto;

import java.util.Date;

public class OffersDTO {
    private Integer id;
    private Integer enterpriseId;
    private String title;
    private String description;
    private Date publicationDate;
    private boolean active;
    private String requirements;
    private String modality;
    private String linkedin;
    private String conditions;
    private String enterpriseName;
    private String enterpriseEmail;
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEnterpriseId() { return enterpriseId; }

    public void setEnterpriseId(Integer enterpriseId) { this.enterpriseId = enterpriseId; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getRequirements() { return requirements; }

    public void setRequirements(String requirements) { this.requirements = requirements; }

    public String getModality() { return modality; }

    public void setModality(String modality) { this.modality = modality; }

    public String getLinkedin() { return linkedin; }

    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getConditions() { return conditions; }

    public void setConditions(String conditions) { this.conditions = conditions; }

    public String getEnterpriseName() { return enterpriseName; }

    public void setEnterpriseName(String enterpriseName) { this.enterpriseName = enterpriseName; }

    public String getEnterpriseEmail() { return enterpriseEmail; }

    public void setEnterpriseEmail(String enterpriseEmail) { this.enterpriseEmail = enterpriseEmail; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

}
