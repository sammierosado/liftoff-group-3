package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.User;

public interface UserService {
    public User createUser(User user);
    public boolean checkEmail(String email);
}
