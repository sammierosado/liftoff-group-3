package brainyBunch.liftoffgroup3.model.repository;
import brainyBunch.liftoffgroup3.model.UserLikedSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLikedSongsRepository extends JpaRepository<UserLikedSongs, Long>{
}
