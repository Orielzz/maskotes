package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.Produto;
import com.br.maskotes.loja.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping
    public List<Produto> listAll() {
        return produtoService.listAll();
    }

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping("/{id}")
    public Produto listOne(@PathVariable Long id) {
        return produtoService.listOne(id);
    }

    @PreAuthorize("hasRole('INSERT')")
    @PostMapping
    public Produto create(@RequestBody Produto produto) {
        return produtoService.create(produto);
    }

    @PreAuthorize("hasRole('UPDATE')")
    @PutMapping("/{id}")
    public Produto update(@RequestBody Produto produto) {
        return produtoService.update(produto);
    }

    @PreAuthorize("hasRole('DELETE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produtoService.delete(id);
    }
}
