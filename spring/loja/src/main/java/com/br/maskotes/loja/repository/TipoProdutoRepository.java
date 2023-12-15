package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.TipoProduto;

public interface TipoProdutoRepository extends JpaRepository<TipoProduto,Long>{
    
}
