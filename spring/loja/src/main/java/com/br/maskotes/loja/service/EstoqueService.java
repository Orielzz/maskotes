package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Estoque;


public interface EstoqueService {
    List<Estoque> listAll();
    Estoque listOne(Long id);
    Estoque create(Estoque estoque);
    Estoque update(Estoque estoque);
    void delete(Long id);
    public Estoque findByProdutoId(Long produtoId);
}
