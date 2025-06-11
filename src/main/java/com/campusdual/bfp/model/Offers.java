package com.campusdual.bfp.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="offers")
public class Offers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer off_id;

    @Column
    private String off_ent_id;

    @Column
    private String off_title;

    @Column
    private String off_description;

    @Column
    private Date off_date;

    @Column
    private boolean active;

}
