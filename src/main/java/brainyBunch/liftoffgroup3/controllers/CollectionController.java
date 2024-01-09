package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.UserCollection;
import brainyBunch.liftoffgroup3.model.repository.UserCollectionRepository;
import brainyBunch.liftoffgroup3.services.UserCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class CollectionController {

    @Autowired
    private UserCollectionService userCollectionService;

    @PostMapping("/collections")
    public ResponseEntity<String> addCollection(@RequestParam String collectionName){
        userCollectionService.addUserCollection(collectionName);
        return ResponseEntity.ok("Collection added successfully");
    }




}
