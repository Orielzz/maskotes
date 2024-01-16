package com.br.maskotes.loja.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.Venda;
import com.br.maskotes.loja.service.VendaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/venda")
@RequiredArgsConstructor
public class VendaController {
    private final VendaService vendaService;

    
    @GetMapping
    public List<Venda> listAll(Venda venda) {
        return vendaService.listAll();
    }

    
    @GetMapping("/{id}")
    public Venda listOne(@PathVariable Long id) {
        return vendaService.listOne(id);
    }

    
    @PostMapping
    public Venda create(@RequestBody Venda venda) {
        return vendaService.create(venda);
    }

    
    @PutMapping("/{id}")
    public Venda update(@RequestBody Venda venda) {
        return vendaService.update(venda);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vendaService.delete(id);
    }
}
