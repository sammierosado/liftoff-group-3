package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.repository.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import brainyBunch.liftoffgroup3.model.Collection;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/save-song")
public class SongController {

    private final CollectionRepository collectionRepository;

    @Autowired
    public SongController(CollectionRepository collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    @PostMapping
    public void saveSong(@RequestBody Collection collection) {
        collectionRepository.save(collection);
    }

}
