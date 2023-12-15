package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.maskotes.loja.entitites.user.Usuario;



public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findByLogin(String login);
    
}
    

