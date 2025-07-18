package com.campusdual.bfp.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "enterpriseid", referencedColumnName = "id")
    private Enterprise enterprise;

    @Column
    private String title;

    @Column
    private String description;

    @Column (name="publicationdate")
    private Date publicationDate;

    @Column
    private boolean active;

    @Column
    private String requirements;

    @Column
    private String modality;

    @Column
    private String linkedin;

    @Column
    private String conditions;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Enterprise getEnterprise() { return enterprise; }

    public void setEnterprise(Enterprise enterprise) { this.enterprise = enterprise; }

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
}
