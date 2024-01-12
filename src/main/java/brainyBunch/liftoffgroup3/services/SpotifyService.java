package brainyBunch.liftoffgroup3.services;

import brainyBunch.liftoffgroup3.model.SearchResult;

public interface SpotifyService {

    SearchResult searchByTermAndType(String query, String type);
}
