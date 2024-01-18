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



    @GetMapping("/all")
    public Iterable<stamp> viewAllStamps() {

        Iterable<stamp> allStamps = stampRepository.findAll();


        return allStamps;
    }

    @PostMapping("/stamps/save")
    public ResponseEntity<?> saveTimestamp(@RequestBody StampForm stampForm, stamp stamp) {

        stamp newStamp = new stamp();


        newStamp.setStampTime(LocalDateTime.now());
        newStamp.setActionDescription(stampForm.getActionDescription()); // Get description from StampForm object
        newStamp.setRetUser(stampForm.getRetUser());




        stampRepository.save(newStamp);


        return ResponseEntity.ok("Stamp saved successfully");
    }

}