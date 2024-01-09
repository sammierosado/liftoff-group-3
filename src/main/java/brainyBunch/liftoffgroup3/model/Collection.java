package brainyBunch.liftoffgroup3.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @NotBlank
//    private String userId;
    @NotBlank
    public String collectionName;
    @NotBlank
    public String albumName;
    @NotBlank
    public String artistName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public String getUserId() {
//        return userId;
//    }
//
//    public void setUserId(String userId) {
//        this.userId = userId;
//    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public Collection(Long id, String collectionName, String albumName, String artistName) {
//    public Collection(Long id, String userId, String collectionName, String albumName, String artistName) {
        this.id = id;
//        this.userId = userId;
        this.collectionName = collectionName;
        this.albumName = albumName;
        this.artistName = artistName;
    }
    public Collection() {
    }
}
