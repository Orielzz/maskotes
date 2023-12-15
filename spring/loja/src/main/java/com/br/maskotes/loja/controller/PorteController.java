package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.Porte;
import com.br.maskotes.loja.service.PorteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/porte")
@RequiredArgsConstructor
public class PorteController {

    private final PorteService porteService;

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping
    public List<Porte> listAll() {
        return porteService.listAll();
    }

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping("/{id}")
    public Porte listOne(@PathVariable Long id) {
        return porteService.listOne(id);
    }

    @PreAuthorize("hasRole('INSERT')")
    @PostMapping
    public Porte create(@RequestBody Porte porte) {
        return porteService.create(porte);
    }

    @PreAuthorize("hasRole('UPDATE')")
    @PutMapping("/{id}")
    public Porte update(@RequestBody Porte porte) {
        return porteService.update(porte);
    }

    @PreAuthorize("hasRole('DELETE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        porteService.delete(id);
    }
}
