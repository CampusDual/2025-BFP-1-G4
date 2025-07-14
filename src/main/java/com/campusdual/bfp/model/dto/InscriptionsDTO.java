package com.campusdual.bfp.model.dto;

public class InscriptionsDTO {
    private Long id;
    private OffersDTO offersDTO;
    private Integer offerId;
    private Integer userId;
    private String inscriptionDate;
    private String status;

    public Integer getOfferId() {
        return offerId;
    }

    public void setOfferId(Integer offerId) {
        this.offerId = offerId;
    }

    public OffersDTO getOffersDTO() { return offersDTO; }

    public void setOffersDTO(OffersDTO offersDTO) { this.offersDTO = offersDTO; }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getInscriptionDate() {
        return inscriptionDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setInscriptionDate(String inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }
}
