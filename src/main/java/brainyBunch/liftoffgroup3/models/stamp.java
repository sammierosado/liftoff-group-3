package brainyBunch.liftoffgroup3.models;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

// Represents a timestamp for tracking actions or events within the application.
@Entity
public class stamp {
    // Primary key of the entity, automatically generated with unique values.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Stores the timestamp value.
    @Column(name = "stamp_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime stampTime;
    private String actionDescription;

    // Default constructor, initializing the timestamp with the current date and time.
    public stamp() {
        this.stampTime = LocalDateTime.now();
    }

    //Sets the timestamp value associated with this stamp.
    public void setStampTime(LocalDateTime stampTime) {
        this.stampTime = stampTime;
    }

    //Retrieves the description of the action associated with this stamp.
    public String getActionDescription() {
        return actionDescription;
    }

    //Sets the description of the action associated with this stamp.
    public void setActionDescription(String actionDescription) {
        this.actionDescription = actionDescription;
    }

    // Updates the timestamp with the current date and time, typically used to mark actions or events.
    public void recordAction() { // Captures the current date and time and stores it in the actionTime` attribute.
        this.stampTime = LocalDateTime.now();
    }

    // Retrieves the stored timestamp value.
    public LocalDateTime getStampTime() { // Provides access to the stored timestamp.
        return stampTime;
    }

    // Standard getter and setter for the primary key.
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Overrides the equals() method to compare two stamp objects based on their id and stampTime values.
    @Override
    public boolean

    equals(Object o)

    {
        if (this == o) return

                true;
        if (o == null || getClass() != o.getClass()) return

                false;
        stamp stamp = (stamp) o;
        return Objects.equals(id, stamp.id) && Objects.equals(stampTime, stamp.stampTime);
    }
    // Overrides the hashCode() method to generate a hash code for the object, used for efficient storage and retrieval in collections.
    @Override
    public int hashCode() {
        return Objects.hash(id, stampTime);
    }

}
