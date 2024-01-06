package brainyBunch.liftoffgroup3.model.repository;
import brainyBunch.liftoffgroup3.model.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import brainyBunch.liftoffgroup3.model.User;
import brainyBunch.liftoffgroup3.model.UserProfileDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {

}
