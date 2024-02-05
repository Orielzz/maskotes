package com.br.maskotes.loja.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
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
public Marca listOne(@PathVariable Long id) {
    if (id != null) {
        return marcaRepository.findById(id).orElse(null);
    } else {
        throw new IllegalArgumentException("O ID não pode ser nulo.");
    }
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
    if (id != null) {
        marcaRepository.deleteById(id);
    } else {
        throw new IllegalArgumentException("O ID não pode ser nulo.");
    }
}


    @Override
    public List<Marca> findByNomeContainingIgnoreCase(String nome) {
        return marcaRepository.findByNomeContainingIgnoreCase(nome);
    }
}
