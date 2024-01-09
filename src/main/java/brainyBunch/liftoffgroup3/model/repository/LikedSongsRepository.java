package brainyBunch.liftoffgroup3.model.repository;
import brainyBunch.liftoffgroup3.model.LikedSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedSongsRepository extends JpaRepository<LikedSongs, Long> {

}
