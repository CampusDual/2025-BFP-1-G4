package com.campusdual.bfp.model;

import javax.persistence.*;

@Entity
@Table(name= "inscriptions")
public class Inscriptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @Column(name= "offerid")
    private Offer offer;

    @ManyToOne
    @Column(name= "userid")
    private User user;

    @Column
    private boolean inscribed;

    public Inscriptions() {
    }
    public Inscriptions(Long id, Offer offer, User user, boolean inscribed) {
        this.id = id;
        this.offer = offer;
        this.user = user;
        this.inscribed = inscribed;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Offer getOffer() { return offer; }

    public void setOffer(Offer offer) { this.offer = offer; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public boolean isInscribed() { return inscribed; }

    public void setInscribed(boolean inscribed) { this.inscribed = inscribed; }
}
