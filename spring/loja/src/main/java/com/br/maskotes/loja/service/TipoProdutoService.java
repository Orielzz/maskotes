package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.TipoProduto;



public interface TipoProdutoService {
    List<TipoProduto> listAll();
    List<TipoProduto> findByDescricaoContainingIgnoreCase(String nome);
    TipoProduto listOne(Long id);
    TipoProduto create(TipoProduto tipoProduto);
    TipoProduto update(TipoProduto tipoProduto);
    void delete(Long id);
}
