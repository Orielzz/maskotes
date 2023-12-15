package com.br.maskotes.loja.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * WebSecurityConfig
 */

 @Configuration
 @EnableWebSecurity
public class WebSecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests((requests) -> requests
                    .requestMatchers(HttpMethod.POST,"/usuarios/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/ping/**").permitAll()
                        .anyRequest()
                        .authenticated()
                        );
        http.csrf(AbstractHttpConfigurer::disable);
                        
        return http.build();
    }
}