package com.br.maskotes.loja.service;

import com.br.maskotes.loja.entitites.ProdutoVendido;
import com.br.maskotes.loja.repository.ProdutoVendidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public ProdutoVendido listOne(Long id) {
        return produtoVendidoRepository.findById(id).orElse(null);
    }

    @Override
    public ProdutoVendido create(ProdutoVendido produtoVendido) {
        return produtoVendidoRepository.save(produtoVendido);
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
        produtoVendidoRepository.deleteById(id);
    }
}
