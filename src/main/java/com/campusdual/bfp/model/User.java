package com.campusdual.bfp.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private int id;

    @Column
    private String phonenumber;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String surname1;

    @Column
    private String surname2;

    @Column
    private String login;

    @Column
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<UserRole> userRole;

    @ManyToOne
    @JoinColumn (name = "enterpriseid", referencedColumnName = "id")
    private Enterprise enterprise;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<UserRole> userRoles = new HashSet<>();

    @Column
    private String degree;

    @Column
    private String experience;

    @Column
    private String modality;

    @Column
    private String presentation;

    @Column
    private String github;

    @Column
    private String linkedin;

    @Column
    private String laboral;

    public User(){ }
    public User(int id, String phonenumber, String email, String name, String surname1, String surname2, String login, String password, Enterprise enterprise, String degree, String experience, String modality, String presentation, String github, String linkedin, String laboral) {
        this.id = id;
        this.phonenumber = phonenumber;
        this.email = email;
        this.name = name;
        this.surname1 = surname1;
        this.surname2 = surname2;
        this.login = login;
        this.password = password;
        this.enterprise = enterprise;
        this.degree = degree;
        this.experience = experience;
        this.modality = modality;
        this.presentation = presentation;
        this.github = github;
        this.linkedin = linkedin;
        this.laboral = laboral;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname1() {
        return surname1;
    }

    public void setSurname1(String surname1) {
        this.surname1 = surname1;
    }

    public String getSurname2() {
        return surname2;
    }

    public void setSurname2(String surname2) {
        this.surname2 = surname2;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Enterprise getEnterprise() { return enterprise; }

    public void setEnterprise(Enterprise enterprise) { this.enterprise = enterprise; }

    public String getDegree() { return degree; }

    public void setDegree(String title) { this.degree = title; }

    public String getExperience() { return experience; }

    public void setExperience(String experience) { this.experience = experience; }

    public String getModality() { return modality; }

    public void setModality(String modality) { this.modality = modality; }

    public String getPresentation() { return presentation; }

    public void setPresentation(String presentation) { this.presentation = presentation; }

    public String getGithub() { return github; }

    public void setGithub(String github) { this.github = github; }

    public String getLinkedin() { return linkedin; }

    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (UserRole userRole : userRoles) {
            authorities.add(new SimpleGrantedAuthority(userRole.getRole().getRoleName()));
        }
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getLaboral() {
        return laboral;
    }
    public void setLaboral(String laboral) {
        this.laboral = laboral;
    }

}
