package brainyBunch.liftoffgroup3.model.repository;

import brainyBunch.liftoffgroup3.models.stamp;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StampRepository extends CrudRepository<stamp, Integer> {
}
