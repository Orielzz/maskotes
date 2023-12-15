package com.br.maskotes.loja.entitites;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="animal")
@Getter
@Setter
public class Animal {

      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;


    @NotNull
    @Column(nullable = false, unique = true)
    private String nome;



    @ManyToMany
    private java.util.List<Porte> porte;

    @ManyToMany
    private java.util.List<Idade> idade;

   
}
