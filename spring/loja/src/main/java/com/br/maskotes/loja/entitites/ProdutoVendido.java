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
@Table(name = "produto_vendido")
@Getter
@Setter
public class ProdutoVendido {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @NotNull
    @Column(nullable = false)
    private int qtd = 0;

    
    private Float preco_unidade= 0.0f;

    
    
    private Float valor_total= qtd * preco_unidade;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    @ManyToOne
    @JoinColumn(name="venda_id")
    private Venda venda;

}
