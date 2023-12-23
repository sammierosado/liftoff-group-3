package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.UserProfileDTO;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public User updateUserProfile(User user, UserProfileDTO userProfileDTO) {

        if (null != user) {
            user.setUsername(userProfileDTO.getUsername());
            user.setEmail(userProfileDTO.getPronoun());
            user.setPronoun(userProfileDTO.getPronoun());
            return userRepository.save(user);
        } else {
            return null;
        }
    }
}
