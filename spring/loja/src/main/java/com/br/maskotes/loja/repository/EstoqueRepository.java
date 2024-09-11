package com.br.maskotes.loja.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Estoque;



public interface EstoqueRepository   extends JpaRepository<Estoque,Long> {
    Estoque findByProdutoId(Long produtoId);
}
