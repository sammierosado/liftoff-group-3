package brainyBunch.liftoffgroup3.Service;

import org.springframework.stereotype.Service;

@Service
public interface UserService {
    boolean authenticateUser(String username, String password);
}
