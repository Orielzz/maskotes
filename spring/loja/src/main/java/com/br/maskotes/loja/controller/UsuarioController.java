package com.br.maskotes.loja.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.maskotes.loja.entitites.user.Usuario;
import com.br.maskotes.loja.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping(value ="/usuarios")
public class UsuarioController {

        @Autowired
        UsuarioService usuarioService;

        
        @PostMapping
        public Usuario insert(@RequestBody Usuario user){
            try {
                 return usuarioService.create(user);
            } catch (RuntimeException e) {
                return null;
            }
           
        }
        @GetMapping
        public String getMethodName() {
            return "entrou";
        }
        



}
