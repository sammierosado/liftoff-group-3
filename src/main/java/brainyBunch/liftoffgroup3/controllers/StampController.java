package brainyBunch.liftoffgroup3.controllers;
import brainyBunch.liftoffgroup3.model.repository.StampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.ui.Model;
import brainyBunch.liftoffgroup3.models.stamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List; // Use java.util.List instead of org.hibernate.mapping.List
import java.lang.Iterable;

@Controller
@RequestMapping("stamps")
public class StampController {

    @Autowired
    private StampRepository stampRepository;

    // Additional methods like findAll, save, findById can be implemented here

    @RequestMapping(path = "/all")
    public String viewAllStamps(Model model) {
        // Retrieve all stamps from the repository
        List<stamp> allStamps = (List<stamp>) stampRepository.findAll();

        // Add the list of stamps to the model for the view to access
        model.addAttribute("allStamps", allStamps);

        return "templates/stamplist"; // Path to your Thymeleaf template for displaying stamps
    }

    @PostMapping("/stamps/save")
    public String saveTimestamp(Model model) {
        LocalDateTime stampTime = LocalDateTime.now(); // Get current timestamp
        stamp newStamp = new stamp(); // Create new stamp with timestamp
        // ... Store the stamp object in the database using repository
        stampRepository.save(newStamp);
        return "templates/stamplist"; // Redirect to your list view
    }

}