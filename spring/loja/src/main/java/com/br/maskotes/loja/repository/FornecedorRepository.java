package com.br.maskotes.loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor,Long>{
     List<Fornecedor> findByNomeContainingIgnoreCase(String nome);
}
