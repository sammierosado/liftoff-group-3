package brainyBunch.liftoffgroup3.controllers;
import brainyBunch.liftoffgroup3.dto.ErrorDTO;
import brainyBunch.liftoffgroup3.dto.LoginDTO;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import brainyBunch.liftoffgroup3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;
    @GetMapping("/login")
    public String viewLoginPage() {
        return "login";
    }
    @PostMapping("/login")
    public ResponseEntity<Object> processLoginForm(@RequestBody LoginDTO loginDTO) {
        if(null == loginDTO.getUsername()){
            return new ResponseEntity<>(new ErrorDTO("User name is required.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        else if(loginDTO.getUsername()!=null && loginDTO.getUsername().trim().equals("")){
            return new ResponseEntity<>(new ErrorDTO("User name can not be blank.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if(null == loginDTO.getPassword()){
            return new ResponseEntity<>(new ErrorDTO("Password is required.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }else if(loginDTO.getPassword()!=null && loginDTO.getPassword().trim().equals("")){
            return new ResponseEntity<>(new ErrorDTO("Password can not be blank.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        else if (loginDTO.getPassword().trim().length() < 3) {
            return new ResponseEntity<>(new ErrorDTO("Password length at least 3 characters.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }

        Optional<User> dbUser = userRepository.findByUsername(loginDTO.getUsername().trim());
        if(dbUser.isEmpty()){
            return new ResponseEntity<>(new ErrorDTO("User not present",HttpStatus.NOT_FOUND),HttpStatus.NOT_FOUND);
        }

       // User user = userService.isPasswordMatch(loginDTO.getUsername().trim(),loginDTO.getPassword());
        if(dbUser.get().getPassword().equals(loginDTO.getPassword())){
            return new ResponseEntity<>(dbUser.get(),HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO("Password is incorrect!", HttpStatus.UNAUTHORIZED));
        }
    }
}

