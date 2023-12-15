package com.br.maskotes.loja.controller;

import com.br.maskotes.loja.entitites.Animal;
import com.br.maskotes.loja.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animal")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping
    public List<Animal> listAll() {
        return animalService.listAll();
    }

    @PreAuthorize("hasRole('SELECT')")
    @GetMapping("/{id}")
    public Animal listOne(@PathVariable Long id) {
        return animalService.listOne(id);
    }

    @PreAuthorize("hasRole('INSERT')")
    @PostMapping
    public Animal create(@RequestBody Animal animal) {
        return animalService.create(animal);
    }

    @PreAuthorize("hasRole('UPDATE')")
    @PutMapping("/{id}")
    public Animal update(@RequestBody Animal animal) {
        return animalService.update(animal);
    }

    @PreAuthorize("hasRole('DELETE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        animalService.delete(id);
    }
}
