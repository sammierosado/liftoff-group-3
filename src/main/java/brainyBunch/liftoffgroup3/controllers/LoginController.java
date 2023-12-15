package brainyBunch.liftoffgroup3.controllers;
import brainyBunch.liftoffgroup3.model.LoginDTO;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class LoginController {

    @Autowired
    UserRepository userRepository;
    @GetMapping("/login")
    public String viewLoginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String processLoginForm(@RequestBody @Valid LoginDTO loginDTO,
                                   Errors errors, HttpServletRequest request,
                                   Model model) {

        if (errors.hasErrors()) {
            model.addAttribute("title", "Log In");
            return "login";
        }

        Optional<User> theUser = userRepository.findByUsername(loginDTO.getUsername());
        if (theUser == null) {
            errors.rejectValue("username", "user.invalid", "The given username does not exist");
            model.addAttribute("title", "Log In");
            return "login";
        }

        String password = loginDTO.getPassword();

        if (!theUser.equals(password)) {
            errors.rejectValue("password", "password.invalid", "Invalid password");
            model.addAttribute("title", "Log In");
            return "login";
        }
        return "redirect:";
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/login";
    }

}

