package com.br.maskotes.loja.service;

import com.br.maskotes.loja.entitites.Produto;
import com.br.maskotes.loja.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoServiceImpl implements ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Override
    public List<Produto> listAll() {
        return produtoRepository.findAll();
    }

    @Override
    public Produto listOne(@PathVariable Long id) {
        return produtoRepository.findById(id).orElse(null);
    }

    @Override
    public Produto create(Produto produto) {
        if (produto.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return produtoRepository.save(produto);
    }

    @Override
    public Produto update(Produto produto) {
        if (produto.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return produtoRepository.save(produto);
    }

    @Override
    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }
}
