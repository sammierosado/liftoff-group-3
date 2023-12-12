package brainyBunch.liftoffgroup3.controller;


import brainyBunch.liftoffgroup3.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String viewLoginForm(Model model) {
        return "login";
    }


    @PostMapping("/processLogin")
    public String processLoginForm(@RequestParam String username,@RequestParam String password, Model model){
        if(userService.authenticateUser(username,password)){
            try {
                return "redirect:/success";
            }catch(Exception e){
                System.out.println("*****************"+e);
                return "index";
            }
        } else{
            model.addAttribute("error","Invalid username or password");
            return "redirect:/login";
        }
      }

    @GetMapping("/success")
    public String loginSuccess(){
        try {
            System.out.println("%%%%%%%%%%%%%%%%%%%");
            return "userProfile";
        }catch(Exception e){
            System.out.println("@@@@@@@@@@@@@@@@@2"+e);
            return "index";
        }
    }
    }

