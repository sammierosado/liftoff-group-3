package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.UserCollection;
import brainyBunch.liftoffgroup3.model.repository.UserCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCollectionServiceImpl {

    @Autowired
    UserCollectionRepository userCollectionRepository;

    public void addCollection(String collectionName){
        if(null != collectionName) {
            UserCollection userCollection = new UserCollection();
            userCollection.setCollectionName(collectionName);
            userCollectionRepository.save(userCollection);
        }
    }
}
