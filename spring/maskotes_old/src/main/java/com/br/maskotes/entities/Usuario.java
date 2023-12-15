package com.br.maskotes.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import javax.validation.constraints.NotNull;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;






@Entity
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long Id;
    @NotNull
    @Column(nullable=false)
    private String login;
    @NotNull
    @Column(nullable = false)
    private String senha;


    public Usuario(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }

    public long getId() {
        return this.Id;
    }


    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    


}
