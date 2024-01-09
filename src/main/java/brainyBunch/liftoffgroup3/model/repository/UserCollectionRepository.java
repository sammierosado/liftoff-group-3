package brainyBunch.liftoffgroup3.model.repository;
import brainyBunch.liftoffgroup3.model.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {

}
