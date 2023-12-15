package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Venda;

public interface VendaService {
     List<Venda> listAll();
    Venda listOne(Long id);
    Venda create(Venda venda);
    Venda update(Venda venda);
    void delete(Long id);
}
