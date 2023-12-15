package com.br.maskotes.loja.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.maskotes.loja.entitites.Fornecedor;
import com.br.maskotes.loja.repository.FornecedorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FornecedorServiceImpl implements FornecedorService {
    private final FornecedorRepository fornecedorRepository;

    @Override
    public List<Fornecedor> listAll() {
        return fornecedorRepository.findAll();
    }

    @Override
    public Fornecedor listOne(@PathVariable Long id) {
        return fornecedorRepository.findById(id).orElse(null);
    }

    @Override
    public Fornecedor create(Fornecedor fornecedor) {
        if (fornecedor.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return fornecedorRepository.save(fornecedor);
    }

    @Override
    public Fornecedor update(Fornecedor fornecedor) {
        if (fornecedor.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return fornecedorRepository.save(fornecedor);
    }

    @Override
    public void delete(Long id) {
        fornecedorRepository.deleteById(id);
    }
}
