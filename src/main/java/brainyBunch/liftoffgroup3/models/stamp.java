package brainyBunch.liftoffgroup3.models;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


@Entity
public class stamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "stamp_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime stampTime;
    private String actionDescription;

    private String retUser;

    public stamp(){};


    public stamp(LocalDateTime stampTime, String actionDescription, String retUser) {
        this.stampTime = stampTime;
        this.actionDescription = actionDescription;
        this.retUser = retUser;
    }


    public void setStampTime(LocalDateTime stampTime) {
        this.stampTime = stampTime;
    }


    public String getActionDescription() {
        return actionDescription;
    }


    public void setActionDescription(String actionDescription) {
        this.actionDescription = actionDescription;
    }

    public String getRetUser(){ return retUser; }

    public void setRetUser(String retUser){this.retUser = retUser; }


    public void recordAction() { // Captures the current date and time and stores it in the actionTime` attribute.
        this.stampTime = LocalDateTime.now();
    }


    public LocalDateTime getStampTime() { // Provides access to the stored timestamp.
        return stampTime;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
