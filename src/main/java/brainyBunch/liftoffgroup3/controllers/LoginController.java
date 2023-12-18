package brainyBunch.liftoffgroup3.controllers;
import brainyBunch.liftoffgroup3.model.ErrorDTO;
import brainyBunch.liftoffgroup3.model.LoginDTO;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import brainyBunch.liftoffgroup3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
        User user = userService.isPasswordMatch(loginDTO.getUsername(),loginDTO.getPassword());
        if(null!=user){
            return new ResponseEntity<>(user,HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO("Login failed!", HttpStatus.UNAUTHORIZED));
        }
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }

}

