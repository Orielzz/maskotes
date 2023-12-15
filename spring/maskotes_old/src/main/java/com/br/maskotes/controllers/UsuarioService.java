package com.br.maskotes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.br.maskotes.entities.Usuario;
import com.br.maskotes.repository.UsuarioRepository;

@Service("usuarioService")
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private Usuario popularUsuario(Usuario user){
        Usuario usuario = new Usuario(user.getLogin(),passwordEncoder.encode(user.getSenha()));
        return usuario;
    }

     public Usuario saveUsuario(Usuario user){
        Usuario usuario = popularUsuario(user);
        return usuarioRepository.save(usuario);
     }

}
