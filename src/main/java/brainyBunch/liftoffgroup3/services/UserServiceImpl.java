package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
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
}
