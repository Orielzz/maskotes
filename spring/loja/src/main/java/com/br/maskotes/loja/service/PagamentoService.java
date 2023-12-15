package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Pagamento;

public interface PagamentoService {
    List<Pagamento> listAll();
    Pagamento listOne(Long id);
    Pagamento create(Pagamento pagamento);
    Pagamento update(Pagamento pagamento);
    void delete(Long id);
}
