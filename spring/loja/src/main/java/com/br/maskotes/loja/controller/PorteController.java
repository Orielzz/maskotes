package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.Porte;
import com.br.maskotes.loja.service.PorteService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/porte")
@RequiredArgsConstructor
public class PorteController {

    private final PorteService porteService;

    
    @GetMapping
    public List<Porte> listAll() {
        return porteService.listAll();
    }

    
    @GetMapping("/{id}")
    public Porte listOne(@PathVariable Long id) {
        return porteService.listOne(id);
    }

    
    @PostMapping
    public Porte create(@RequestBody Porte porte) {
        return porteService.create(porte);
    }

    
    @PutMapping("/{id}")
    public Porte update(@RequestBody Porte porte) {
        return porteService.update(porte);
    }

    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        porteService.delete(id);
    }
}
