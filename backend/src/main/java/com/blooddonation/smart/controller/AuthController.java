package com.blooddonation.smart.controller;

import com.blooddonation.smart.model.User;
import com.blooddonation.smart.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    public AuthController(UserRepository users) { this.users = users; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getName()==null || user.getEmail()==null || user.getPassword()==null)
            return ResponseEntity.badRequest().body(Map.of("message","Name, email and password are required"));
        if (users.existsByEmail(user.getEmail().toLowerCase()))
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message","Email already registered"));
        user.setEmail(user.getEmail().toLowerCase());
        User saved = users.save(user);
        return ResponseEntity.ok(Map.of("id",saved.getId(),"name",saved.getName(),"email",saved.getEmail(),"role",saved.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String email = body.getOrDefault("email","").toLowerCase();
        String password = body.getOrDefault("password","");
        return users.findByEmail(email)
            .filter(u -> u.getPassword().equals(password))
            .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail(),"role",u.getRole())))
            .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Invalid email or password")));
    }
}
