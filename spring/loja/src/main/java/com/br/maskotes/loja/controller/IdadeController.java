package com.br.maskotes.loja.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.Idade;
import com.br.maskotes.loja.service.IdadeService;

import lombok.RequiredArgsConstructor;

import java.util.List;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/idade")
@RequiredArgsConstructor
public class IdadeController {
    private final IdadeService idadeService;

    
    @GetMapping
    public List<Idade> listAll(Idade idade) {
        return idadeService.listAll();
    }

    
    @GetMapping("/{id}")
    public Idade listOne(@PathVariable Long id) {
        return idadeService.listOne(id);
    }

    
    @PostMapping
    public Idade create(@RequestBody Idade idade) {
        return idadeService.create(idade);
    }

    
    @PutMapping("/{id}")
    public Idade update(@RequestBody Idade idade) {
        return idadeService.update(idade);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        idadeService.delete(id);
    }
}
