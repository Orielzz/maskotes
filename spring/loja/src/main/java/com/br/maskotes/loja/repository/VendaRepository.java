package com.br.maskotes.loja.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.br.maskotes.loja.entitites.Venda;

public interface VendaRepository extends JpaRepository<Venda,Long>{
    List<Venda> findAllBydataVenda(Date data);
    
    
    
    @Query("SELECT v FROM Venda v WHERE v.dataVenda BETWEEN :inicio AND :fim order by v.dataVenda")
    List<Venda> findAllByDataVendaBetween(@Param("inicio") Date inicio, @Param("fim") Date fim);
}

