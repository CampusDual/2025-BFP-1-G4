package com.campusdual.bfp.model.dto;

import java.util.Date;

public class OffersDTO {
    private Integer off_id;
    private Integer offEntID;
    private String offTittle;
    private String offDescription;
    private Date offDate;
    private boolean offActive;

    public Integer getOff_id() {
        return off_id;
    }

    public void setOff_id(Integer off_id) {
        this.off_id = off_id;
    }

    public Integer getOffEntID() {
        return offEntID;
    }

    public void setOffEntID(Integer offEntID) {
        this.offEntID = offEntID;
    }

    public String getOffTittle() {
        return offTittle;
    }

    public void setOffTittle(String offTittle) {
        this.offTittle = offTittle;
    }

    public String getOffDescription() {
        return offDescription;
    }

    public void setOffDescription(String offDescription) {
        this.offDescription = offDescription;
    }

    public Date getOffDate() {
        return offDate;
    }

    public void setOffDate(Date offDate) {
        this.offDate = offDate;
    }

    public boolean isOffActive() {
        return offActive;
    }

    public void setOffActive(boolean offActive) {
        this.offActive = offActive;
    }
}
