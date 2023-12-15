package com.br.maskotes.loja.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.maskotes.loja.entitites.Venda;
import com.br.maskotes.loja.repository.VendaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VendaServiceImpl implements VendaService {
    private final VendaRepository vendaRepository;

    @Override
    public List<Venda> listAll() {
        return vendaRepository.findAll();
    }

    @Override
    public Venda listOne(@PathVariable Long id) {
        return vendaRepository.findById(id).orElse(null);
    }

    @Override
    public Venda create(Venda venda) {
        if (venda.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return vendaRepository.save(venda);
    }

    @Override
    public Venda update(Venda venda) {
        if (venda.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return vendaRepository.save(venda);
    }

    @Override
    public void delete(Long id) {
        vendaRepository.deleteById(id);
    }
}
