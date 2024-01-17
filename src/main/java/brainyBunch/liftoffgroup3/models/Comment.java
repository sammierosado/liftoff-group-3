package brainyBunch.liftoffgroup3.models;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long id;

    private String commentText;

    private String albumName;

    // Default constructor
    public Comment() {}

    // Constructor for creating comments with text
    public Comment(String commentText) {this.commentText = commentText;}

    // Getters and setters..
    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return

                false;
        Comment comment = (Comment) o;
        return Objects.equals(commentText, comment.commentText);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, commentText);
    }

}
