package com.campusdual.bfp.model.dto;

public class InscriptionsDTO {
    private Long id;
    private Integer offerId;
    private Integer userId;
    private boolean inscribed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOfferId() {
        return offerId;
    }

    public void setOfferId(Integer offerId) {
        this.offerId = offerId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public boolean isInscribed() {
        return inscribed;
    }

    public void setInscribed(boolean inscribed) {
        this.inscribed = inscribed;
    }
}
