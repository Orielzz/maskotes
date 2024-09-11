package com.br.maskotes.loja.service;

import com.br.maskotes.loja.repository.EstoqueRepository;
import com.br.maskotes.loja.entitites.Estoque;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstoqueServiceImpl implements EstoqueService {

    private final EstoqueRepository estoqueRepository;

    @Override
    public List<Estoque> listAll() {
        return estoqueRepository.findAll();
    }

   @Override
public Estoque listOne(@PathVariable Long id) {
    if (id != null) {
        return estoqueRepository.findById(id).orElse(null);
    } else {
        throw new IllegalArgumentException("O ID não pode ser nulo.");
    }
}
    public Estoque findByProdutoId(Long produtoId) {
        return estoqueRepository.findByProdutoId(produtoId);
    }

    @Override
    public Estoque create(Estoque estoque) {
        if (estoque.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return estoqueRepository.save(estoque);
    }

    @Override
    public Estoque update(Estoque estoque) {
        if (estoque.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return estoqueRepository.save(estoque);
    }

    @Override
    public void delete(Long id) {
        if (id != null) {
            estoqueRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("O ID não pode ser nulo.");
        }
    }
    

  
}
