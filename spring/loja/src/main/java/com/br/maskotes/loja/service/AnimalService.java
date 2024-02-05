package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Animal;


public interface AnimalService {
      List<Animal> listAll();
      List<Animal> findByNomeContainingIgnoreCase(String name);
    Animal listOne(Long id);
    Animal create(Animal animal);
    Animal update(Animal animal);
    void delete(Long id);
}
