package com.br.maskotes.loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.br.maskotes.loja.entitites.user.Usuario;



public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findByLogin(String login);


    @Query("SELECT u FROM Usuario u JOIN FETCH u.regras WHERE u.login= :login")
    Usuario findByLoginFetchRoles(@Param("login") String login);
    
}
    

