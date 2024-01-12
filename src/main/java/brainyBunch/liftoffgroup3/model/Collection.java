package brainyBunch.liftoffgroup3.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

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

    public String artist;

    @NotBlank
    public String username;

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

    public String getArtists() {
        return artist;
    }

    public void setArtists(String artist) {
        this.artist = artist;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Collection(Long id, String collectionName, String albumName, List<String> artists, String username) {
//    public Collection(Long id, String userId, String collectionName, String albumName, String artistName) {
        this.id = id;
//        this.userId = userId;
        this.collectionName = collectionName;
        this.albumName = albumName;
        this.artist = artist;
        this.username = username;

    }
    public Collection() {
    }
}
