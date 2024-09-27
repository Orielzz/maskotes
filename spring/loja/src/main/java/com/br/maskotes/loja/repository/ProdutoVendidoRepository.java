package com.br.maskotes.loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.br.maskotes.loja.entitites.ProdutoVendido;

public interface ProdutoVendidoRepository extends JpaRepository<ProdutoVendido,Long>{
    @Query("SELECT pv FROM ProdutoVendido pv WHERE pv.venda.id = :vendaId")
    List<ProdutoVendido> findAllByVendaId(@Param("vendaId") Long vendaId);
}
