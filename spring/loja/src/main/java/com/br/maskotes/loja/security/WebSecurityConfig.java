package com.br.maskotes.loja.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
//import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;







/**
 * WebSecurityConfig
 */

 @Configuration
 @EnableWebSecurity
 @EnableMethodSecurity

public class WebSecurityConfig {
    @Autowired
    // private CustomBasicAuthenticationFilter customBasicAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
    //    return http.csrf(csrf -> csrf.disable())
    //     .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //         .authorizeHttpRequests((requests) -> requests
    //                 .requestMatchers(HttpMethod.POST,"/usuarios/**").permitAll()
    //                 .requestMatchers(HttpMethod.GET,"/ping/**").permitAll()
    //                 .requestMatchers(HttpMethod.GET,"/site/public/login").permitAll()
    //                     .anyRequest().authenticated()
    //                     )
    //                     .formLogin(formlogin -> formlogin
    //                     .loginPage("/site/public/login.html")
    //                     .permitAll()
    //                     )
                        
    //                     .addFilterBefore(customBasicAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
    //                     .build();
    
        http.csrf(csrf->csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(authorizeRequests ->
            authorizeRequests.anyRequest().permitAll()
        );
    
    return http.build();
}
@Bean
public WebMvcConfigurer corsConfig(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry){
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:5500", "http://localhost:8080" , "http://192.168.1.229:8080")
                        .allowedMethods(HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.PUT.name())
                        .allowedHeaders(HttpHeaders.CONTENT_TYPE,HttpHeaders.AUTHORIZATION
                        )
                        ;

            }
        };
    }


}