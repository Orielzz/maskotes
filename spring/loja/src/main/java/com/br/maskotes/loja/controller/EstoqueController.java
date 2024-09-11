package com.br.maskotes.loja.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.Estoque;
import com.br.maskotes.loja.service.EstoqueService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/estoque")
@RequiredArgsConstructor
public class EstoqueController {
    private final EstoqueService estoqueService;

    
    @GetMapping
    public List<Estoque> listAll(Estoque estoque) {
        return estoqueService.listAll();
    }

    @GetMapping("/produto/{produtoId}")
    public Estoque getEstoqueByProdutoId(@PathVariable Long produtoId) {
       return estoqueService.findByProdutoId(produtoId);
    }
    
    @GetMapping("/{id}")
    public Estoque listOne(@PathVariable Long id) {
        return estoqueService.listOne(id);
    }

    
    @PostMapping
    public Estoque create(@RequestBody Estoque estoque) {
        return estoqueService.create(estoque);
    }

    
    @PutMapping("/{id}")
    public Estoque update(@RequestBody Estoque estoque) {
        return estoqueService.update(estoque);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        estoqueService.delete(id);
    }
}
