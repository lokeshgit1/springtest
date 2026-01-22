package com.example.nameapp.controller;

import com.example.nameapp.model.User;
import com.example.nameapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/name")
public class NameController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> submitName(@RequestBody User user) {
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name cannot be empty"));
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
