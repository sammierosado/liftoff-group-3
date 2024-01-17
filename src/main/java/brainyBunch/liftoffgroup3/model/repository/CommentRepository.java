package brainyBunch.liftoffgroup3.model.repository;

import brainyBunch.liftoffgroup3.models.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

    void deleteById(Long commentId);
}
