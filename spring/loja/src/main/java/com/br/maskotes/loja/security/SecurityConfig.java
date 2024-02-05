// package com.br.maskotes.loja.security;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import static org.springframework.security.config.Customizer.withDefaults;
// import org.springframework.security.web.AuthenticationEntryPoint;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     .requestMatchers(HttpMethod.GET,"/site/public/login.html").permitAll()
//                     .requestMatchers(HttpMethod.POST,"/site/public/login.html").permitAll()
//                     .anyRequest().authenticated()
//             )
//             .httpBasic(withDefaults())
//             .exceptionHandling(exceptionHandling ->
//                 exceptionHandling
//                     .authenticationEntryPoint(authenticationEntryPoint())
//             );
//         return http.build();
//     }

//     @Bean
//     public AuthenticationEntryPoint authenticationEntryPoint() {
//         return (request, response, authException) -> {
//             response.sendRedirect("http://localhost:8080/site/public/login.html");
//         };
//     }
// }
