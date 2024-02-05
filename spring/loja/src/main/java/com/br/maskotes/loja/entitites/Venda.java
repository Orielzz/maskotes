package com.br.maskotes.loja.entitites;

import java.util.Date;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "venda")
@Getter
@Setter
public class Venda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    
    private Float valorTotal = 0.0f;

    @Temporal(TemporalType.DATE)
    @Column(columnDefinition = "date default current_date")
    private Date dataVenda;

    @ManyToOne
    @JoinColumn(name="pagamento_id")
    private Pagamento pagamento;
}
