package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.CollectionDTO;
import brainyBunch.liftoffgroup3.model.UserCollection;
import brainyBunch.liftoffgroup3.model.repository.UserCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserCollectionServiceImpl implements UserCollectionService {

    @Autowired
    UserCollectionRepository userCollectionRepository;
    @Override
    public void addUserCollection(CollectionDTO collectionDTO){
        if(null != collectionDTO) {
            UserCollection userCollection = new UserCollection();
            userCollection.setCollectionName(collectionDTO.getCollectionName());
            userCollection.setUsername(collectionDTO.getUsername());
            userCollection.setCreatedDate(LocalDateTime.now());
            userCollection.setLastUpdatedDate(LocalDateTime.now());
            userCollectionRepository.save(userCollection);
        }
    }
}
