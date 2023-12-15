package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.ProdutoVendido;
import com.br.maskotes.loja.service.ProdutoVendidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto-vendido")
@RequiredArgsConstructor
public class ProdutoVendidoController {
    private final ProdutoVendidoService produtoVendidoService;

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping
    public List<ProdutoVendido> listAll() {
        return produtoVendidoService.listAll();
    }

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping("/{id}")
    public ProdutoVendido listOne(@PathVariable Long id) {
        return produtoVendidoService.listOne(id);
    }

    @PreAuthorize("hasRole('INSERT')")
    @PostMapping
    public ProdutoVendido create(@RequestBody ProdutoVendido produtoVendido) {
        return produtoVendidoService.create(produtoVendido);
    }

    @PreAuthorize("hasRole('UPDATE')")
    @PutMapping("/{id}")
    public ProdutoVendido update(@RequestBody ProdutoVendido produtoVendido) {
        return produtoVendidoService.update(produtoVendido);
    }

    @PreAuthorize("hasRole('DELETE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produtoVendidoService.delete(id);
    }
}
