package com.br.maskotes.loja.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.br.maskotes.loja.entitites.user.Usuario;

import lombok.Getter;

@Getter
public class UsuarioPrincipal {
    private String login;
    private String senha;
    private Collection<? extends GrantedAuthority> authorities;

    private UsuarioPrincipal(Usuario user){
        this.login = user.getLogin();
        this.senha = user.getSenha();
        this.authorities= user.getRegras().stream().map(regra->{
            return new SimpleGrantedAuthority("ROLE_".concat(regra.getName()));
        }).collect(Collectors.toList());
    }

    public static UsuarioPrincipal create(Usuario user){
        return new UsuarioPrincipal(user);
    }
}
