package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.TipoProduto;
import com.br.maskotes.loja.service.TipoProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipo-produto")
@RequiredArgsConstructor
public class TipoProdutoController {

    private final TipoProdutoService tipoProdutoService;

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping
    public List<TipoProduto> listAll() {
        return tipoProdutoService.listAll();
    }

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping("/{id}")
    public TipoProduto listOne(@PathVariable Long id) {
        return tipoProdutoService.listOne(id);
    }

    @PreAuthorize("hasRole('INSERT')")
    @PostMapping
    public TipoProduto create(@RequestBody TipoProduto tipoProduto) {
        return tipoProdutoService.create(tipoProduto);
    }

    @PreAuthorize("hasRole('UPDATE')")
    @PutMapping("/{id}")
    public TipoProduto update(@RequestBody TipoProduto tipoProduto) {
        return tipoProdutoService.update(tipoProduto);
    }

    @PreAuthorize("hasRole('DELETE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tipoProdutoService.delete(id);
    }
}
