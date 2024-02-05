package com.br.maskotes.loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Marca;

public interface MarcaRepository extends JpaRepository<Marca,Long>{
    List<Marca> findByNomeContainingIgnoreCase(String nome); 
    
} 
