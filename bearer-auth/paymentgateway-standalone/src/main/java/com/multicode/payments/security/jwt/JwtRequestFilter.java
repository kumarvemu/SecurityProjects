package com.multicode.payments.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends GenericFilterBean {

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    UserDetailsService userDetailsService; //we have provided an implementation for this!

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        //First of all find out if this request contains a bearer token
        final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            String jwtToken = requestTokenHeader.substring(7);
            try {
                String username = jwtTokenService.getUsernameFromToken(jwtToken);
                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if (jwtTokenService.validateToken(jwtToken, userDetails)) {
                        //The token is valid so we tell Spring that this user has been authenticated
                        //by setting up a pretend username + password authentication token
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                        usernamePasswordAuthenticationToken
                                .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    }
                    else {
                        System.out.println("Token not valid");
                    }
                }
            } catch (IllegalArgumentException e) {
                System.out.println("Token validation problem");
                e.printStackTrace();
            } catch (ExpiredJwtException e) {
                System.out.println("Token has expired");
            }


        } else {
            //no bearer authentication header so we'll ignore this
        }

        filterChain.doFilter(servletRequest, servletResponse);
        SecurityContextHolder.getContext().setAuthentication(null);
    }

}
