package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.UserCollection;
import brainyBunch.liftoffgroup3.model.repository.UserCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface UserCollectionService {
    public void addUserCollection(String collectionName);
}
