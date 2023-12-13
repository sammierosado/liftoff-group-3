//package brainyBunch.liftoffgroup3.controller;
//
//import brainyBunch.liftoffgroup3.model.User;
//import brainyBunch.liftoffgroup3.model.dto.RegisterFormDTO;
//import brainyBunch.liftoffgroup3.model.repository.UserRepository;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//
//@Controller
//public class RegisterController {
//
//    @Autowired
//    UserRepository userRepository;
//
//    @GetMapping("/register")
//    public String viewRegistrationForm(Model model) {
//        User user = new User();
//        model.addAttribute("user", user);
//        return "register";
//    }
//
//    @PostMapping("/processRegister")
//    public String processRegistrationForm(User user) {
//
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(encodedPassword);
//        userRepository.save(user);
//        return "registerSuccess";
//    }
//
//    @GetMapping("/registerSuccess")
//    public String registerSuccess(Model model) {
//        User user = new User();
//        model.addAttribute("user", user);
//        return "index";
//    }
//
//}