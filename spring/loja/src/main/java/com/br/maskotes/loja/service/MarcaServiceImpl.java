package com.br.maskotes.loja.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.maskotes.loja.entitites.Marca;
import com.br.maskotes.loja.repository.MarcaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MarcaServiceImpl implements MarcaService {
    private final MarcaRepository marcaRepository;

    @Override
    public List<Marca> listAll() {
        return marcaRepository.findAll();
    }

    @Override
    public Marca listOne(Long id) {
        return marcaRepository.findById(id).orElse(null);
    }

    @Override
    public Marca create(Marca marca) {
        if (marca.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return marcaRepository.save(marca);
    }

    @Override
    public Marca update(Marca marca) {
        if (marca.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return marcaRepository.save(marca);
    }

    @Override
    public void delete(Long id) {
        marcaRepository.deleteById(id);
    }
}
