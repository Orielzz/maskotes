package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento,Long>{
    
}
