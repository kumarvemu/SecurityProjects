package com.multicode.payments.control;

import com.multicode.payments.data.UserRepository;
import com.multicode.payments.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoginController {

    @Autowired
    UserRepository userRepository;

    /* This won't compile until the security dependency has been added!

    @PostMapping
    public Map<String,String> login(@RequestBody Map<String,String> loginData) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
             username = ((UserDetails)principal).getUsername();
        } else {
             username = principal.toString();
        }

        Map<String,String> results = new HashMap<>();
        User user = userRepository.findByUsername(username);
        results.put("name" , user.getName());
        results.put("role", user.getRole().toString());
        return results;
    }


     */
}
