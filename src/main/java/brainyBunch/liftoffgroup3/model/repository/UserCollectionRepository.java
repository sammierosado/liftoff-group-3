package brainyBunch.liftoffgroup3.model.repository;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {
  //  @Query(value = "SELECT * FROM user_collection u WHERE u.username = :username", nativeQuery = true)
     List<UserCollection> findAllCollectionByUsername(String username);

}
