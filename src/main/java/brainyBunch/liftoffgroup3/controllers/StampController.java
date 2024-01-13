package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.repository.StampRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import brainyBunch.liftoffgroup3.models.stamp;

import java.time.LocalDateTime;
import java.lang.Iterable;
import brainyBunch.liftoffgroup3.models.StampForm;

@CrossOrigin(origins = "*")
@RestController
public class StampController {

    @Autowired
    private StampRepository stampRepository;

    // Additional methods like findAll, save, findById can be implemented here

    @GetMapping("/all")
    public Iterable<stamp> viewAllStamps() {
        // Retrieve all stamps from the repository
        Iterable<stamp> allStamps = stampRepository.findAll();

        // Return the list of stamps as a JSON response
        return allStamps; // Spring will automatically serialize this to JSON
    }

    @PostMapping("/stamps/save")
    public ResponseEntity<?> saveTimestamp(@RequestBody StampForm stampForm, stamp stamp) {
        // Create a new stamp object
        stamp newStamp = new stamp();

        // Set necessary properties
        newStamp.setStampTime(LocalDateTime.now());
        newStamp.setActionDescription(stampForm.getActionDescription()); // Get description from StampForm object
        newStamp.setRetUser(stampForm.getRetUser());

        // Optionally, add other properties as needed
        // ...

        // Save the stamp to the database
        stampRepository.save(newStamp);

        // Return a success message
        return ResponseEntity.ok("Stamp saved successfully");
    }

}