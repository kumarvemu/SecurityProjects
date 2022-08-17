package com.multicode.payments.service;

import com.multicode.payments.data.UserRepository;
import com.multicode.payments.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    /* TODO - this won't compile until the security dependency is added
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

     */

    public void save(User user) {
        userRepository.save(user);
    }

}
