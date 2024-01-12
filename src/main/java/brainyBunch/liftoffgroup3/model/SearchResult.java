package brainyBunch.liftoffgroup3.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class SearchResult {

    private List<Album> albums = new ArrayList<>();
    private List<Artist> artists = new ArrayList<>();
    private List<Track> tracks = new ArrayList<>();

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    public List<Artist> getArtists() {
        return artists;
    }

    public void setArtists(List<Artist> artists) {
        this.artists = artists;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public void addAlbum(Album album) {
        this.albums.add(album);
    }

    public void addArtist(Artist artist) {
        this.artists.add(artist);
    }

    public void addTrack(Track track) {
        this.tracks.add(track);
    }

    public SearchResult() {
    }

    public SearchResult(List<Album> albums, List<Artist> artists, List<Track> tracks) {
        this.albums = albums;
        this.artists = artists;
        this.tracks = tracks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SearchResult that = (SearchResult) o;
        return Objects.equals(albums, that.albums) && Objects.equals(artists, that.artists) && Objects.equals(tracks, that.tracks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(albums, artists, tracks);
    }

    @Override
    public String toString() {
        return "SearchResult{" +
                "albums=" + albums +
                ", artists=" + artists +
                ", tracks=" + tracks +
                '}';
    }
}
