package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Venda;

public interface VendaRepository extends JpaRepository<Venda,Long>{
    
}
