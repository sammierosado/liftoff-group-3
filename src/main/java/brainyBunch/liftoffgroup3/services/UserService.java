package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.dto.UserProfileDTO;

public interface UserService {
    public User createUser(User user);
    public boolean checkEmail(String email);
    public User isPasswordMatch(String username, String password);
    public User updateUserProfile(User user, UserProfileDTO userProfileDTO);

}
