package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.UserProfileDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    public User createUser(User user);
    public boolean checkEmail(String email);
    public User isPasswordMatch(String username, String password);
    public User updateUserProfile(User user, UserProfileDTO userProfileDTO);

    public void uploadProfileImageByUsername(String username, String imageUrl);

}
