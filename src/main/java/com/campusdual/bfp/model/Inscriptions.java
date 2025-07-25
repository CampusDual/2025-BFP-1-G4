package com.campusdual.bfp.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "inscriptions")
public class Inscriptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "offerid")
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @Column
    private Date inscriptiondate;

    @Column
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getInscriptiondate() {
        return inscriptiondate;
    }

    public void setInscriptiondate(Date inscriptiondate) {
        this.inscriptiondate = inscriptiondate;
    }

    public void getOfferId() { }

    public void getUserId() { }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }
}
