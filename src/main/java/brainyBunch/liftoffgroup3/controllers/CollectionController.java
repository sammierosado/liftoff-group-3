package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.CollectionDTO;
import brainyBunch.liftoffgroup3.model.UserCollection;
import brainyBunch.liftoffgroup3.model.repository.UserCollectionRepository;
import brainyBunch.liftoffgroup3.services.UserCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class CollectionController {

    @Autowired
    private  UserCollectionRepository userCollectionRepository;
    @Autowired
    private UserCollectionService userCollectionService;

    @PostMapping("/collections")
    public ResponseEntity<Object> addCollection(@RequestBody CollectionDTO collectionDTO){
        userCollectionService.addUserCollection(collectionDTO);
        List<UserCollection> userCollections = userCollectionRepository.findAllCollectionByUsername(collectionDTO.getUsername());
        return new ResponseEntity<>(userCollections, HttpStatus.OK);
    }

    @GetMapping("/collections/{username}")
    public ResponseEntity<Object> getCollectionByUsername(@PathVariable String username){
        List<UserCollection> userCollections = userCollectionRepository.findAllCollectionByUsername(username);
        return new ResponseEntity<>(userCollections, HttpStatus.OK);
    }







}
