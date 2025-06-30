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
    @Column(name = "offerid")
    private Offer offer;

    @ManyToOne
    @Column(name = "userid")
    private User user;

    @Column
    private Date inscriptiondate;

    @Column
    private boolean inscribed;

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

    public boolean isInscribed() {
        return inscribed;
    }

    public void setInscribed(boolean inscribed) {
        this.inscribed = inscribed;
    }

    public void getOfferId() {
    }

    public void getUserId() {
    }
}
