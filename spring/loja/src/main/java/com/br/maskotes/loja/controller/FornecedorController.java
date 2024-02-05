package com.br.maskotes.loja.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.Fornecedor;
import com.br.maskotes.loja.service.FornecedorService;

import lombok.RequiredArgsConstructor;

import java.util.List;

//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/fornecedor")
@RequiredArgsConstructor
public class FornecedorController {
    private final FornecedorService fornecedorService;

    
    @GetMapping
    public List<Fornecedor> listAll(Fornecedor fornecedor) {
        return fornecedorService.listAll();
    }

       @GetMapping("/nome/{nome}")
    public List<Fornecedor> listOne(@PathVariable String nome) {
        return fornecedorService.findByNomeContainingIgnoreCase(nome);
    }
    @GetMapping("/{id}")
    public Fornecedor listOne(@PathVariable Long id) {
        return fornecedorService.listOne(id);
    }

    
    @PostMapping
    public Fornecedor create(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.create(fornecedor);
    }

    
    @PutMapping("/{id}")
    public Fornecedor update(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.update(fornecedor);
    }

   
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        fornecedorService.delete(id);
    }
}
