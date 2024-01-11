package brainyBunch.liftoffgroup3.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class LikedSongs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    public String likedSongs;
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

    public String getLikedSongs() {
        return likedSongs;
    }

    public void setLikedSongs(String likedSongs) {
        this.likedSongs = likedSongs;
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

    public LikedSongs(Long id, String likedSongs, String albumName, String artistName) {
        this.id = id;
        this.likedSongs = likedSongs;
        this.albumName = albumName;
        this.artistName = artistName;
    }
    public LikedSongs() {
    }
}
