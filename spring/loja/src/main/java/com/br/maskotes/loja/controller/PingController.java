package com.br.maskotes.loja.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping(value = "/ping" )
public class PingController {

    @GetMapping
    public String ping(){

        return "pong";
    }


}
