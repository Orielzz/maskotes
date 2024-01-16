package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.Produto;
import com.br.maskotes.loja.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/produto")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    
    @GetMapping
    public List<Produto> listAll() {
        return produtoService.listAll();
    }


    @GetMapping("/nome/{nome}")
    public List<Produto> listOne(@RequestParam Optional<String> nome) {
        return produtoService.findByNomeContaining(nome);
    }

    
    @GetMapping("/{id}")
    public Produto listOne(@PathVariable Long id) {
        return produtoService.listOne(id);
    }

    
    @PostMapping
    public Produto create(@RequestBody Produto produto) {
        return produtoService.create(produto);
    }

    
    @PutMapping("/{id}")
    public Produto update(@RequestBody Produto produto) {
        return produtoService.update(produto);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produtoService.delete(id);
    }
}
