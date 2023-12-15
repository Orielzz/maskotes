package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Idade;


public interface IdadeService {
     List<Idade> listAll();
    Idade listOne(Long id);
    Idade create(Idade idade);
    Idade update(Idade idade);
    void delete(Long id);
    
}