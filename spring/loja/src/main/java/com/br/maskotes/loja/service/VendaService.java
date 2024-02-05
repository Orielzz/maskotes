package com.br.maskotes.loja.service;

import java.util.Date;
import java.util.List;

import com.br.maskotes.loja.entitites.Venda;

public interface VendaService {
     List<Venda> listAll();
     List<Venda> findAllByDataVenda(Date data);
     List<Venda> findAllByDataVendaBetween(Date inicio,Date fim);
    Venda listOne(Long id);
    Venda create(Venda venda);
    Venda update(Venda venda);
    void delete(Long id);
}
