package com.br.maskotes.loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Produto;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {
    List<Produto> findByNomeContaining(String name);
}
