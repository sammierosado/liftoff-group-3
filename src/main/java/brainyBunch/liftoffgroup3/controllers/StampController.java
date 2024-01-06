package brainyBunch.liftoffgroup3.controllers;
import brainyBunch.liftoffgroup3.model.repository.StampRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import brainyBunch.liftoffgroup3.models.stamp;

import java.time.LocalDateTime;
import java.lang.Iterable;

@Controller
public class StampController {

    @Autowired
    private StampRepository stampRepository;

    // Additional methods like findAll, save, findById can be implemented here

    @GetMapping("/all")
    public String viewAllStamps(Model model) {
        // Retrieve all stamps from the repository
        Iterable<stamp> allStamps = stampRepository.findAll();

        // Add the list of stamps to the model for the view to access
        model.addAttribute("allStamps", allStamps);

        return "/stamplist"; // Path to your Thymeleaf template for displaying stamps
    }

    @PostMapping("/stamps/save")
    public String saveTimestamp(Model model) {
        LocalDateTime stampTime = LocalDateTime.now(); // Get current timestamp
        stamp newStamp = new stamp(); // Create new stamp with timestamp

        // Set necessary properties
        newStamp.setStampTime(stampTime);
        newStamp.setActionDescription("Some action description");  // Example of setting another property

        // ... Store the stamp object in the database using repository
        stampRepository.save(newStamp);
        return "templates/stamplist"; // Redirect to your list view
    }

}