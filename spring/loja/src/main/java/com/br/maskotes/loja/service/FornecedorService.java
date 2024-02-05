package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Fornecedor;

public interface FornecedorService {

     List<Fornecedor> listAll();
     List<Fornecedor> findByNomeContainingIgnoreCase(String nome);
    Fornecedor listOne(Long id);
    Fornecedor create(Fornecedor fornecedor);
    Fornecedor update(Fornecedor fornecedor);
    void delete(Long id);
}
