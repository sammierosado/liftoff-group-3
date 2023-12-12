package brainyBunch.liftoffgroup3.Service;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean authenticateUser(String username, String password){
        User user = userRepository.findByUsername(username);
        return  user!=null && user.getPassword().equals(password);
    }
}
