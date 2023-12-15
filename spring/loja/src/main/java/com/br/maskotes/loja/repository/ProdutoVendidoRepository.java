package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.ProdutoVendido;

public interface ProdutoVendidoRepository extends JpaRepository<ProdutoVendido,Long>{
    
}
