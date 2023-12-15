package com.br.maskotes.loja.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.br.maskotes.loja.entitites.user.Usuario;
import com.br.maskotes.loja.repository.UsuarioRepository;

/**
 * UsuarioServiceImpl
 */
@Service
public class UsuarioServiceImpl implements UsuarioService {
        @Autowired
    UsuarioRepository usuarioRepository;
    


    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Override
    public Usuario create(Usuario user) {
        Usuario exist = usuarioRepository.findByLogin(user.getLogin());
        
        if(exist != null){
            throw new RuntimeException("usuario ja existe");
        }
            
        user.setSenha(passwordEncoder().encode(user.getSenha()));
        
        return usuarioRepository.save(user);
    }

    
}