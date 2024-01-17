package brainyBunch.liftoffgroup3.controllers;
import brainyBunch.liftoffgroup3.model.repository.CommentRepository;
import brainyBunch.liftoffgroup3.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
@RestController
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    // Create a new comment
    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

    // Retrieve all comments
    @GetMapping
    public Iterable<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentRepository.deleteById(commentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllComments() {
        commentRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}