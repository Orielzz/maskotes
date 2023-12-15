package com.br.maskotes.loja.service;

import com.br.maskotes.loja.entitites.Animal;
import com.br.maskotes.loja.repository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;

    @Override
    public List<Animal> listAll() {
        return animalRepository.findAll();
    }

    @Override
    public Animal listOne(Long id) {
        return animalRepository.findById(id).orElse(null);
    }

    @Override
    public Animal create(Animal animal) {
        if (animal.getId() != null) {
            throw new RuntimeException("Não é possível inserir já com ID");
        }
        return animalRepository.save(animal);
    }

    @Override
    public Animal update(Animal animal) {
        if (animal.getId() == null) {
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter ID");
        }
        return animalRepository.save(animal);
    }

    @Override
    public void delete(Long id) {
        animalRepository.deleteById(id);
    }
}
