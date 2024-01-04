package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.ErrorDTO;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.UserProfileDTO;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
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
    public void uploadProfileImageByUsername(String username, String fileDownloadUri) {

        Optional<User> user = userRepository.findByUsername(username);
        User updatedUser = user.get();
        System.out.println("fileDownloadUri im impl ============================="+fileDownloadUri);
       if(null!= fileDownloadUri) {
           System.out.println("Image :------------" + fileDownloadUri);
           updatedUser.setProfile_Img_url(fileDownloadUri);
       }else{
            System.out.println("File not found");
            }
        userRepository.save(updatedUser);
    }


}
