package com.multicode.payments.control;

import com.multicode.payments.data.UserRepository;
import com.multicode.payments.domain.User;
import com.multicode.payments.security.jwt.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping
    public Map<String,String> login() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
             username = ((UserDetails)principal).getUsername();
        } else {
             username = principal.toString();
        }

        Map<String,String> results = new HashMap<>();
        User user = userRepository.findByUsername(username);
        results.put("username", username);
        results.put("name" , user.getName());
        results.put("role", user.getRole().toString());
        jwtTokenService.generateToken(results);
        results.put("token",  jwtTokenService.generateToken(results));
        return results;
    }
}
