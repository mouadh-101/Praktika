package org.esprit.user.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.esprit.user.controllers.Dto.UserStatisticDTO;
import org.esprit.user.entities.User;
import org.esprit.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;


    public String registerUser(User userDTO) {
        try {
            System.out.println(userDTO.toString());
            userRepository.save(userDTO);
            return "User registered successfully!";
        } catch (Exception e) {
            return "Error registering user: " + e.getMessage();
        }
    }
    //forinternship
    public List<String> getAllUsersID() {
        return userRepository.findAllUserIds();
    }
    public String getUserEmail(String userId){
        return userRepository.findEmailByUserId(userId);
    }
    public String getUserId(String email){
        return userRepository.findUserIdByEmail(email);
    }


    public User updateUser(String userId, User user)
    {
        User exitUser=userRepository.findById(userId).orElse(null);
        if(exitUser!=null)
        {
            exitUser.setAddress(user.getAddress());
            exitUser.setName(user.getName());
            exitUser.setPhone(user.getPhone());
            return userRepository.save(exitUser);
        }

        return null;
    }
    public UserStatisticDTO getUserStatistics() {
        return userRepository.getUserStatistics();
    }
}