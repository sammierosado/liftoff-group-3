package brainyBunch.liftoffgroup3.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class stamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime stampTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public stamp() {
        this.stampTime = LocalDateTime.now();
    }

    public void recordAction() { // Captures the current date and time and stores it in theactionTime` attribute.
        this.stampTime = LocalDateTime.now();
    }


    public LocalDateTime getStampTime() { // Provides access to the stored timestamp.
        return stampTime;
    }

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

    @Override
    public int hashCode() {
        return Objects.hash(id, stampTime);
    }

}
