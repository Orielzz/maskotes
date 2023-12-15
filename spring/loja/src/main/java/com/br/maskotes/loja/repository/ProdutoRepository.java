package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Produto;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {

}
