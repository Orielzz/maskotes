package com.br.maskotes.loja.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.Pagamento;
import com.br.maskotes.loja.service.PagamentoService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/pagamento")
@RequiredArgsConstructor
public class PagamentoController {
    private final PagamentoService pagamentoService;



    @PreAuthorize("hasRole('SELECT')")
    @GetMapping
    public List<Pagamento> listAll(Pagamento pagamento) {
    return pagamentoService.listAll();
    }


    
    @PreAuthorize("hasRole('SELECT')")
    @GetMapping("/{id}")
    public Pagamento listOne(@PathVariable Long id) {
        return pagamentoService.listOne(id);
    }

    
    @PreAuthorize("hasRole('INSERT')")
    @PostMapping
    public Pagamento create(@RequestBody Pagamento pagamento) {
        return pagamentoService.create(pagamento);
    }

    @PreAuthorize("hasRole('UPDATE')")
    @PutMapping("/{id}")
    public Pagamento update(@RequestBody Pagamento pagamento) {
        return pagamentoService.update(pagamento);
    }


    @PreAuthorize("hasRole('DELETE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        pagamentoService.delete(id);
    }
    

}
