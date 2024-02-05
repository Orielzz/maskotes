package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Marca;




public interface MarcaService {
    List<Marca> listAll();
    List<Marca> findByNomeContainingIgnoreCase(String nome); 
    Marca listOne(Long id);
    Marca create(Marca marca);
    Marca update(Marca marca);
    void delete(Long id);

    
}

