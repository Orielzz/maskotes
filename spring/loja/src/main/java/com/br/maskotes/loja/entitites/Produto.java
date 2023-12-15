package com.br.maskotes.loja.entitites;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;




@Entity
@Table(name = "produto")
@Getter
@Setter
public class Produto {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;


 

    @NotNull
    private String nome;
    @NotNull
    private int porcentagem_varejo = 0;
     @NotNull
    private int porcentagem_saco = 0;

    @NotNull
    @Column(columnDefinition = "decimal(10,3) default 0.0")
    private Float preco_custo = 0.0f;

    @Column(columnDefinition = "decimal(10,3) default 0.0")
    @NotNull
    private Float preco_quilo = preco_custo*porcentagem_varejo/100;

    @NotNull
    @Column(columnDefinition = "decimal(10,3) default 0.0")
    private Float preco_saco = preco_custo*porcentagem_saco/100;

    @ManyToOne
    @JoinColumn(name="tipo_produto_id")
    private TipoProduto tipoProduto;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name="fornecedor_id")
    private Fornecedor fornecedor;


}
