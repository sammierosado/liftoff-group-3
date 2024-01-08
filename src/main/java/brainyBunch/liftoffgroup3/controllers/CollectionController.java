package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.Collection;
import brainyBunch.liftoffgroup3.model.repository.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class CollectionController {

    @Autowired
    private CollectionRepository collectionRepository;

    @PostMapping("collections")
    public void addCollection(String collectionName){
        Collection newCollection = new Collection();
        newCollection.setCollectionName(collectionName);
        collectionRepository.save(newCollection);
    }

}
