package com.br.maskotes.loja.service;

import java.util.List;

import com.br.maskotes.loja.entitites.Porte;

public interface PorteService {
    List<Porte> listAll();
    Porte listOne(Long id);
    Porte create(Porte porte);
    Porte update(Porte porte);
    void delete(Long id);
}
