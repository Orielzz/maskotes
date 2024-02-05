package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.TipoProduto;
import com.br.maskotes.loja.service.TipoProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipo-produto")
@RequiredArgsConstructor
public class TipoProdutoController {

    private final TipoProdutoService tipoProdutoService;

    
    @GetMapping
    public List<TipoProduto> listAll() {
        return tipoProdutoService.listAll();
    }

       @GetMapping("/nome/{nome}")
    public List<TipoProduto> findByNomeContainingIgnoreCase(@PathVariable String nome) {
        return tipoProdutoService.findByDescricaoContainingIgnoreCase(nome);
    }

    
    @GetMapping("/{id}")
    public TipoProduto listOne(@PathVariable Long id) {
        return tipoProdutoService.listOne(id);
    }

    
    @PostMapping
    public TipoProduto create(@RequestBody TipoProduto tipoProduto) {
        return tipoProdutoService.create(tipoProduto);
    }

    
    @PutMapping("/{id}")
    public TipoProduto update(@RequestBody TipoProduto tipoProduto) {
        return tipoProdutoService.update(tipoProduto);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tipoProdutoService.delete(id);
    }
}
