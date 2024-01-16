// package com.br.maskotes.loja.security;

// import java.io.IOException;
// import java.io.PrintWriter;
// import java.util.Base64;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.br.maskotes.loja.entitites.user.Usuario;
// import com.br.maskotes.loja.repository.UsuarioRepository;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import lombok.RequiredArgsConstructor;
// @Component
// @RequiredArgsConstructor
// public class CustomBasicAuthenticationFilter extends OncePerRequestFilter{
//     private static final String AUTHORIZATION = "Authorization";
//     private static final String BASIC = "Basic ";
//     private final UsuarioRepository usuarioRepository;
    
    
    
//     public PasswordEncoder passwordEncoder(){
//         return new BCryptPasswordEncoder();
//     };

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
//         if(isBasicAuthentication(request)){
//             String[] credentials = decodeBase64(getHeader(request).replace(BASIC, ""))
//                         .split(":");
//             String login = credentials[0];
//             String senha = credentials[1];

//             Usuario user = usuarioRepository.findByLoginFetchRoles(login);

//             if(user == null){
//                 response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                 response.getWriter().write("Usuario não existe");
//                 return;
//             }

//             boolean valid = checkPassword(user.getSenha(),senha);

//             if (!valid) {
//             response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//             try (PrintWriter writer = response.getWriter()) {
//                 writer.write("Senha Inválida");
//             }
//             return;
// }

//             setAuthentication(user);
                                    
//         }
//         filterChain.doFilter(request, response);
//     }

//     private void setAuthentication(Usuario user) {
//         Authentication authentication = createAuthenticationToken(user);
//         SecurityContextHolder.getContext().setAuthentication(authentication);
//     }

//     private Authentication createAuthenticationToken(Usuario user) {
//         UsuarioPrincipal usuarioPrincipal = UsuarioPrincipal.create(user);
//         return new UsernamePasswordAuthenticationToken(usuarioPrincipal, null, usuarioPrincipal.getAuthorities());
//     }

//     private boolean checkPassword(String senhaUsuario, String senhaLogin) {
//         return passwordEncoder().matches(senhaLogin, senhaUsuario);
//     }

//     private String decodeBase64(String base64) {
//         byte[] decodeBytes = Base64.getDecoder().decode(base64);
//         return new String(decodeBytes);
//     }

//     private boolean isBasicAuthentication (HttpServletRequest request){
//         String header = getHeader(request);
//         return header != null && header.startsWith(BASIC);
//     }

//     private String getHeader(HttpServletRequest request){
//         return request.getHeader(AUTHORIZATION);
//     }
    
// }
