package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.dto.ErrorDTO;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> createUser(@RequestBody User user) throws Exception {

        if(null == user.getUsername()) {
            return new ResponseEntity<>(new ErrorDTO("Username required.", HttpStatus.UNPROCESSABLE_ENTITY), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        else if(user.getUsername()!=null && user.getUsername().trim().equals("")){
            return new ResponseEntity<>(new ErrorDTO("Username can not be blank",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if(null == user.getEmail()) {
            return new ResponseEntity<>(new ErrorDTO("Email is required.", HttpStatus.UNPROCESSABLE_ENTITY), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        else if(user.getEmail()!=null && user.getEmail().trim().equals("")){
            return new ResponseEntity<>(new ErrorDTO("Email can not be blank.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if(null == user.getPassword()) {
            return new ResponseEntity<>(new ErrorDTO("Password is required.", HttpStatus.UNPROCESSABLE_ENTITY), HttpStatus.UNPROCESSABLE_ENTITY);
        } else if(user.getPassword()!=null && user.getPassword().trim().equals("")){
            return new ResponseEntity<>(new ErrorDTO("Password can not be blank.",HttpStatus.UNPROCESSABLE_ENTITY),HttpStatus.UNPROCESSABLE_ENTITY);
        }
        boolean userExist = userService.checkEmail(user.getEmail());
        if(userExist){
            return new ResponseEntity<>(new ErrorDTO("User already exist", HttpStatus.BAD_REQUEST),HttpStatus.BAD_REQUEST);
        }
        System.out.println("create user");
        User newUser = userService.createUser(user);
        if(newUser!=null){
            return new ResponseEntity<>(newUser,HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Something went wrong.",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }
    }
