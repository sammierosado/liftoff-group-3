package brainyBunch.liftoffgroup3.model.repository;

import brainyBunch.liftoffgroup3.model.Collection;
import brainyBunch.liftoffgroup3.model.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {

}
