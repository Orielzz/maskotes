package com.br.maskotes.loja.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.maskotes.loja.entitites.Porte;
import com.br.maskotes.loja.repository.PorteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PorteServiceImpl implements PorteService {

    private final PorteRepository porteRepository;

    @Override
    public List<Porte> listAll() {
        return porteRepository.findAll();
    }

    @Override
    public Porte listOne(@PathVariable Long id) {
        return porteRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Porte create(Porte porte) {
        if (porte.getId() != null) {
            throw new IllegalArgumentException("Não é possível inserir já com ID");
        }
        return porteRepository.save(porte);
    }

    @Override
    @Transactional
    public Porte update(Porte porte) {
        if (porte.getId() == null) {
            throw new IllegalArgumentException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return porteRepository.save(porte);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        porteRepository.deleteById(id);
    }
}
