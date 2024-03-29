package brainyBunch.liftoffgroup3.model;

import java.util.ArrayList;
import java.util.List;

public class Track {

    private String id;
    private String title;

    private String imageUrl;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Track() {
    }

    public Track(String id, String title,String imageUrl) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;

    }
}
