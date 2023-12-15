package com.br.maskotes.loja.service;

import java.util.List;


import com.br.maskotes.loja.entitites.Produto;

public interface ProdutoService {
       List<Produto> listAll();
    Produto create(Produto produto);
    Produto update(Produto produto);
    Produto listOne(Long id);
    void delete(Long id);
   
}