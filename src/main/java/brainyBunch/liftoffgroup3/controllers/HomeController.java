package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String viewHomePage() {
        return "index";
    }
    @GetMapping("login")
    public String viewLoginPage() {
        return "login";
    }
    @GetMapping("/register")
    public String viewRegisterPage() {
        return "register";
    }
    @PostMapping("/createUser")
    public String createUser(@ModelAttribute User user, HttpSession session){
        System.out.println(user.getEmail());
        boolean exist = userService.checkEmail(user.getEmail());
        System.out.println("!!!!!!"+exist);
        if(exist){
            session.setAttribute("msg","Email id already exist!");
            return "redirect:/register";
        }else{
            System.out.println("create user");
            User newUser = userService.createUser(user);
            if(newUser!=null){
                session.setAttribute("msg","Register Successfully");
                return "redirect:/";
            }else{
                session.setAttribute("msg","Error in user register");
                return "redirect:/register";
            }
        }

    }
}
