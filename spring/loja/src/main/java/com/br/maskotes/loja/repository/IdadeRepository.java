package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Idade;

public interface IdadeRepository extends JpaRepository<Idade,Long>{
    
}
