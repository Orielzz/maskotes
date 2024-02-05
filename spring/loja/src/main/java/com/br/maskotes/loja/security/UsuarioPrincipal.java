package com.br.maskotes.loja.security;




import com.br.maskotes.loja.entitites.user.Usuario;

import lombok.Getter;

@Getter
public class UsuarioPrincipal {
    private String login;
    private String senha;
   

    private UsuarioPrincipal(Usuario user){
        this.login = user.getLogin();
        this.senha = user.getSenha();
        
    }

    public static UsuarioPrincipal create(Usuario user){
        return new UsuarioPrincipal(user);
    }
}
