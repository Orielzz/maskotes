package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.ProdutoVendido;
import com.br.maskotes.loja.service.ProdutoVendidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto-vendido")
@RequiredArgsConstructor
public class ProdutoVendidoController {
    private final ProdutoVendidoService produtoVendidoService;

    
    @GetMapping
    public List<ProdutoVendido> listAll() {
        return produtoVendidoService.listAll();
    }

    
    @GetMapping("/{id}")
    public ProdutoVendido listOne(@PathVariable Long id) {
        return produtoVendidoService.listOne(id);
    }
    @GetMapping("/venda/{id}")
    public List<ProdutoVendido> findByVendaId(@PathVariable Long id) {
        return produtoVendidoService.findByVendaId(id);
    }

    
    @PostMapping
    public ProdutoVendido create(@RequestBody ProdutoVendido produtoVendido) {
        return produtoVendidoService.create(produtoVendido);
    }

    
    @PutMapping("/{id}")
    public ProdutoVendido update(@RequestBody ProdutoVendido produtoVendido) {
        return produtoVendidoService.update(produtoVendido);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produtoVendidoService.delete(id);
    }
}
