package com.br.maskotes.loja.service;

import java.util.List;
import java.util.Optional;

import com.br.maskotes.loja.entitites.Produto;

public interface ProdutoService {
       List<Produto> listAll();
       List<Produto> findByNomeContainingIgnoreCase(Optional<String> infix);
       Produto findByCodigoBarras(Long codigo);
    Produto create(Produto produto);
    Produto update(Produto produto);
    Produto listOne(Long id);
    void delete(Long id);
   
}