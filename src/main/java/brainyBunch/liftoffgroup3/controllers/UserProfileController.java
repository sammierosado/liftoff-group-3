package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.ErrorDTO;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.UserProfileDTO;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import brainyBunch.liftoffgroup3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class UserProfileController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @GetMapping("/userProfile/{username}")
    public ResponseEntity<Object> viewUserProfile(@PathVariable String username){
        //todo add validation null
        //throw error if username is not in db
        if(null == username){
            return new ResponseEntity<>(new ErrorDTO("User can not be null",HttpStatus.BAD_REQUEST),HttpStatus.BAD_REQUEST);
        }
        Optional<User> dbUser = userRepository.findByUsername(username.trim());
        if(dbUser.isEmpty()){
            return new ResponseEntity<>(new ErrorDTO("User not present",HttpStatus.NOT_FOUND),HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(dbUser.get(),HttpStatus.OK);
        }
    }

    @PutMapping("/userProfile/{username}")
    public ResponseEntity<Object> updateUserProfile(@PathVariable String username,@RequestBody UserProfileDTO userProfileDTO){

        Optional<User> existingUser = userRepository.findByUsername(username);
        if(existingUser.isEmpty()){
            return new ResponseEntity<>(new ErrorDTO("User not found.", HttpStatus.BAD_REQUEST),HttpStatus.BAD_REQUEST);
        }else{
             User updatedUser =  userService.updateUserProfile(existingUser.get(),userProfileDTO);
             if(updatedUser== null){
                 return new ResponseEntity<>(new ErrorDTO("User not found.", HttpStatus.BAD_REQUEST),HttpStatus.BAD_REQUEST);
             }
             return new ResponseEntity<>(updatedUser,HttpStatus.OK);
        }
    }
}
