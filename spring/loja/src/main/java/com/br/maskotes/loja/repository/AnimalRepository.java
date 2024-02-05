package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Animal;
import java.util.List;


public interface AnimalRepository   extends JpaRepository<Animal,Long> {
    List<Animal> findByNomeContainingIgnoreCase(String nome);
}
