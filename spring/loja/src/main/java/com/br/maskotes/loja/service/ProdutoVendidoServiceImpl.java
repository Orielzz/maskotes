package com.br.maskotes.loja.service;


import com.br.maskotes.loja.entitites.ProdutoVendido;
import com.br.maskotes.loja.repository.ProdutoVendidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProdutoVendidoServiceImpl implements ProdutoVendidoService {
    private final ProdutoVendidoRepository produtoVendidoRepository;

    @Override
    public List<ProdutoVendido> listAll() {
        return produtoVendidoRepository.findAll();
    }

 @Override
public ProdutoVendido listOne(@PathVariable Long id) {
    if (id != null) {
        return produtoVendidoRepository.findById(id).orElse(null);
    } else {
        throw new IllegalArgumentException("O ID não pode ser nulo.");
    }
}


@Override
public ProdutoVendido create(ProdutoVendido produtoVendido) {
    if (produtoVendido != null) {
        return produtoVendidoRepository.save(produtoVendido);
    } else {
        throw new IllegalArgumentException("O produtoVendido não pode ser nulo.");
    }
}


    @Override
    public ProdutoVendido update(ProdutoVendido produtoVendido) {
        if (produtoVendido.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter id");
        }
        return produtoVendidoRepository.save(produtoVendido);
    }

    @Override
    public void delete(Long id) {
        if (id != null) {
            produtoVendidoRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("O ID não pode ser nulo.");
        }
    }
    
}
