package com.br.maskotes.loja.service;

import com.br.maskotes.loja.entitites.TipoProduto;
import com.br.maskotes.loja.repository.TipoProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TipoProdutoServiceImpl implements TipoProdutoService {

    private final TipoProdutoRepository tipoProdutoRepository;

    @Override
    public List<TipoProduto> listAll() {
        return tipoProdutoRepository.findAll();
    }

    @Override
    public TipoProduto listOne(Long id) {
        return tipoProdutoRepository.findById(id).orElse(null);
    }

    @Override
    public TipoProduto create(TipoProduto tipoProduto) {
        if (tipoProduto.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return tipoProdutoRepository.save(tipoProduto);
    }

    @Override
    public TipoProduto update(TipoProduto tipoProduto) {
        if (tipoProduto.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return tipoProdutoRepository.save(tipoProduto);
    }

    @Override
    public void delete(Long id) {
        tipoProdutoRepository.deleteById(id);
    }
}
