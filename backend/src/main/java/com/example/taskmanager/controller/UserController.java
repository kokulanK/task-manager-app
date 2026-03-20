package com.example.taskmanager.controller;

import com.example.taskmanager.dto.MessageResponse;
import com.example.taskmanager.dto.UserProfileDto;
import com.example.taskmanager.entity.User;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/profile")
    public UserProfileDto getProfile() {
        User user = getCurrentUser();
        return new UserProfileDto(user.getId(), user.getName(), user.getEmail());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserProfileDto profileDto) {
        User user = getCurrentUser();
        if (!user.getEmail().equals(profileDto.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email cannot be changed"));
        }
        user.setName(profileDto.getName());
        if (profileDto.getPassword() != null && !profileDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(profileDto.getPassword()));
        }
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Profile updated successfully"));
    }

    @DeleteMapping("/account")
    public ResponseEntity<?> deleteAccount() {
        User user = getCurrentUser();
        userService.deleteUserAccount(user);
        return ResponseEntity.ok(new MessageResponse("Account deleted successfully"));
    }
}