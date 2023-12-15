package com.br.maskotes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.br.maskotes.entities.Usuario;
import com.br.maskotes.repository.UsuarioRepository;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para criar um novo usuário
    @PostMapping
    public ResponseEntity<Usuario> insert(@RequestBody Usuario usuario) {
        Usuario usuarioSalvo = usuarioService.saveUsuario(usuario);
        return ResponseEntity.ok(usuarioSalvo);
    }

    // Endpoint para obter detalhes de um usuário por ID
    @GetMapping(value= "/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable long id) {
        Usuario usuario = usuarioRepository.findById(id).get();
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para obter todos os usuários
    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok(usuarios);
    }

    // Endpoint para atualizar um usuário existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable long id, @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        if (usuarioAtualizado != null) {
            return ResponseEntity.ok(usuarioAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para excluir um usuário por ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        usuarioRepository.deleteById(id);
    }
}
