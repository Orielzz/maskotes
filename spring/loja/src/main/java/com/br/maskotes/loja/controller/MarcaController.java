package com.br.maskotes.loja.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.Marca;
import com.br.maskotes.loja.service.MarcaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/marca")
@RequiredArgsConstructor
public class MarcaController {
    private final MarcaService marcaService;

    @GetMapping
    public List<Marca> listAll() {
        return marcaService.listAll();
    }

    @GetMapping("/{id}")
    public Marca listOne(@PathVariable Long id) {
        return marcaService.listOne(id);
    }

    @GetMapping("/nome/{nome}")
    public List<Marca> findByNome(@PathVariable String nome) {
        return marcaService.findByNomeContainingIgnoreCase(nome);
    }

    @PostMapping
    public Marca create(@RequestBody Marca marca) {
        return marcaService.create(marca);
    }

    @PutMapping("/{id}")
    public Marca update(@RequestBody Marca marca) {
        return marcaService.update(marca);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        marcaService.delete(id);
    }
}
