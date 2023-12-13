//package brainyBunch.liftoffgroup3.controller;
//
//
//import brainyBunch.liftoffgroup3.Service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//
//@Controller
//public class LoginController {
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping("/login")
//    public String viewLoginForm(Model model) {
//        return "login";
//    }
//
//    @PostMapping("/processLogin")
//    public String processLoginForm(@RequestParam String username, @RequestParam String password, Model model) {
//        System.out.println("***************"+username+"*******"+password);
////        if (userService.authenticateUser(username, password)) {
////            return "redirect:/success";
////        } else {
////            model.addAttribute("error", "Invalid username or password");
////            return "redirect:/login";
////        }
//        return "redirect:/success";
//    }
//    @GetMapping("/success")
//    public String loginSuccess() {
//        return "userProfile";
//    }
//    @GetMapping("/logout")
//    public String logout() {
//        return "redirect:/login";
//        }
//
//    }
//
