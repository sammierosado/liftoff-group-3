package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class RegisterController {

    @Autowired
    UserService userService;
    @GetMapping("/register")
    public String viewRegisterPage() {
        return "register";
    }
    @PostMapping("/register")
    public String createUser(@RequestBody User user) throws Exception {
        boolean exist = userService.checkEmail(user.getEmail());
        if(exist){
            throw new Exception("User already exist");
        }else{
            System.out.println("create user");
            User newUser = userService.createUser(user);
            if(newUser!=null){
                return "User registered successfully";
            }else{
                throw new Exception("User details not valid!");
            }
        }

    }
}