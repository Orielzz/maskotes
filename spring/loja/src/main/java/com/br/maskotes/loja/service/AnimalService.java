package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Animal;


public interface AnimalService {
      List<Animal> listAll();
    Animal listOne(Long id);
    Animal create(Animal animal);
    Animal update(Animal animal);
    void delete(Long id);
}
