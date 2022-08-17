package com.multicode.payments.security;
import com.multicode.payments.security.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;

    @Autowired
    UserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //AUTHENTICATION
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder());

    }

    @Autowired
    JwtRequestFilter jwtRequestFilter;

    //AUTHORIZATION

    @Override
    protected void configure(HttpSecurity http)
            throws Exception {

        http.cors().and().authorizeRequests().antMatchers(HttpMethod.OPTIONS).permitAll();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/payment/**")
                .hasAnyRole("USER","MANAGER")
                .antMatchers(HttpMethod.POST, "/api/login")
                .hasAnyRole("USER","MANAGER")
                .antMatchers(HttpMethod.POST, "/api/payment/**")
                .hasRole("MANAGER")
                .antMatchers(HttpMethod.PUT, "/api/payment/**")
                .hasRole("MANAGER")
                .and().csrf().disable()
                .httpBasic();

    }
}
