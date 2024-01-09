package brainyBunch.liftoffgroup3.model;

public class CollectionDTO {

    private String collectionName;
    private String username;

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public CollectionDTO(String collectionName, String username) {
        this.collectionName = collectionName;
        this.username = username;
    }

    public CollectionDTO() {
    }
}
