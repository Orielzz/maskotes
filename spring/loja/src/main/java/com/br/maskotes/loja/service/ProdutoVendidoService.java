package com.br.maskotes.loja.service;

import java.util.List;
import com.br.maskotes.loja.entitites.ProdutoVendido;

public interface ProdutoVendidoService {
      List<ProdutoVendido> listAll();
    ProdutoVendido create(ProdutoVendido produtoVendido);
    ProdutoVendido update(ProdutoVendido produtoVendido);
    ProdutoVendido listOne(Long id);
    void delete(Long id);
    List<ProdutoVendido> findByVendaId(Long idVenda);
}
