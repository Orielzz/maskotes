package com.br.maskotes.loja.entitites;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tipo_produto")
@Getter
@Setter
public class TipoProduto {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long Id;
    @NotNull
    @Column(nullable=false)
    private String descricao;
}
