package brainyBunch.liftoffgroup3.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String username;
    private String pronoun;
    @NotBlank
    @Email private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String lastLoggedIn;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPronoun() {
        return pronoun;
    }
    public void setPronoun(String pronoun) {
        this.pronoun = pronoun;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastLoggedIn() {
        return lastLoggedIn;
    }

    public void setLastLoggedIn(String lastLoggedIn) {
        this.lastLoggedIn = lastLoggedIn;
    }

    public User(Long id, String username, String pronoun, String email, String password, String lastLoggedIn) {
        this.id = id;
        this.username = username;
        this.pronoun = pronoun;
        this.email = email;
        this.password = password;
        this.lastLoggedIn = lastLoggedIn;
    }
    public User() {
    }

}
