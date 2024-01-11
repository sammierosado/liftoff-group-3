package brainyBunch.liftoffgroup3.services.impl;

import brainyBunch.liftoffgroup3.exception.SpotifyException;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.dto.UserProfileDTO;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import brainyBunch.liftoffgroup3.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
       user.setLastLoggedIn(LocalDateTime.now().toString());
       return userRepository.save(user);
    }
    @Override
    public boolean checkEmail(String email) {
         Optional<User> newUser = userRepository.findByEmail(email);
         if(newUser.isPresent()){
             return true;
         }
         return false;
    }
    @Override
    public User isPasswordMatch(String username, String password){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            User loggedInUser  = user.get();
            loggedInUser.setLastLoggedIn(LocalDateTime.now().toString());
            userRepository.save(loggedInUser);
            return loggedInUser;
        }else{
            return null;
        }
    }
    @Override
    @Transactional
    public User updateUserProfile(User user, UserProfileDTO userProfileDTO) {

        if (null != user) {
            user.setUsername(userProfileDTO.getUsername());
            user.setEmail(userProfileDTO.getEmail());
            user.setPronoun(userProfileDTO.getPronoun());
            return userRepository.save(user);
        } else {
            return null;
        }
    }
    @Override
    @Transactional
    public User saveProfileImageToDatabaseByUsername(String username, MultipartFile file) {


        if(null == username) {
            throw new SpotifyException("Username is required", HttpStatus.BAD_REQUEST);
        } else if("".equals(username.trim())) {
            throw new SpotifyException("Username can not be empty", HttpStatus.BAD_REQUEST);
        }

        Optional<User> user = userRepository.findByUsername(username);
        User existingUser = user.get();

        try {
            existingUser.setProfileImage(Base64.getEncoder().encodeToString(file.getBytes()));
            return userRepository.save(existingUser);

        } catch (IOException e) {
            throw new SpotifyException("Unable to save image to database", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public byte[] fetchProfileImageByUsername(String username) {

        if(null == username) {
            throw new SpotifyException("Username is required", HttpStatus.BAD_REQUEST);
        } else if("".equals(username.trim())) {
            throw new SpotifyException("Username can not be empty", HttpStatus.BAD_REQUEST);
        }

        Optional<User> optionalUser = userRepository.findByUsername(username);
        User existingUser = optionalUser.get();
        if(existingUser.getProfileImage() == null){
            throw new SpotifyException("Profile image is not found", HttpStatus.NOT_FOUND);
        }else{
            return Base64.getDecoder().decode(existingUser.getProfileImage());
        }
    }

}
