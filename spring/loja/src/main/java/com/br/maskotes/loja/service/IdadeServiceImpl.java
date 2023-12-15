package com.br.maskotes.loja.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.maskotes.loja.entitites.Idade;
import com.br.maskotes.loja.repository.IdadeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class IdadeServiceImpl implements IdadeService {
    private final IdadeRepository idadeRepository;

    @Override
    public List<Idade> listAll() {
        return idadeRepository.findAll();
    }

    @Override
    public Idade listOne(@PathVariable Long id) {
        return idadeRepository.findById(id).orElse(null);
    }

    @Override
    public Idade create(Idade idade) {
        if (idade.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return idadeRepository.save(idade);
    }

    @Override
    public Idade update(Idade idade) {
        if (idade.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return idadeRepository.save(idade);
    }

    @Override
    public void delete(Long id) {
        idadeRepository.deleteById(id);
    }
}
