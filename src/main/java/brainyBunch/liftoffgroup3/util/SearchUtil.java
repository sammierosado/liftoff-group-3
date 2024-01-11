package brainyBunch.liftoffgroup3.util;

import brainyBunch.liftoffgroup3.model.Album;
import brainyBunch.liftoffgroup3.model.Artist;
import brainyBunch.liftoffgroup3.model.SearchResult;
import brainyBunch.liftoffgroup3.model.Track;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class SearchUtil {
    public SearchResult formatSearchResult(JSONArray itemsArray, String type) {

        SearchResult searchResult = new SearchResult();

        /*JSONObject resultObject = new JSONObject(result);
        JSONArray itemsArray = resultObject.getJSONArray(CommonConstants.ITEMS);*/

        for(int i = 0; i < itemsArray.length(); i++) {

            JSONObject jsonObject = itemsArray.getJSONObject(i);

            if("album".equals(type)) {
                searchResult.addAlbum(formatAlbumObject(jsonObject));
            } else if("artist".equals(type)) {
                searchResult.addArtist(formatArtistObject(jsonObject));
            } else if("track".equals(type)) {
                searchResult.addTrack(formatTrackObject(jsonObject));
            }

        }
        return searchResult;
    }

    private Album formatAlbumObject(JSONObject jsonObject) {

        Album album = new Album();
        album.setId(jsonObject.getString("id"));
        album.setName(jsonObject.getString("name"));
        album.setImageUrl(extractImageUrlFromImages(jsonObject.getJSONArray("images")));
        return album;
    }


    private Artist formatArtistObject(JSONObject jsonObject) {

        Artist artist = new Artist();
        artist.setId(jsonObject.getString("id"));
        artist.setName(jsonObject.getString("name"));
        artist.setImageUrl(extractImageUrlFromImages(jsonObject.getJSONArray("images")));

        return artist;
    }


    private Track formatTrackObject(JSONObject jsonObject) {

        Track track = new Track();
        track.setId(jsonObject.getString("id"));
        track.setTitle(jsonObject.getString("name"));
        track.setImageUrl(extractImageUrlFromImages(jsonObject.getJSONObject("album").getJSONArray("images")));
        return track;
    }


    private String extractImageUrlFromImages(JSONArray imagesJsonArray) {

        String url = "";

        for(int i = 0; i < imagesJsonArray.length(); i++) {
            url = imagesJsonArray.getJSONObject(i).getString("url");
        }


        return url;
    }


    private String formatTrackDuration(int durationMs) {

        int roundOffDuration = (int) Math.ceil((double) durationMs / 1000);

        int min = roundOffDuration / 60;
        int sec = roundOffDuration % 60;

        String minStr = min < 10 ? "0" + min : "" + min;
        String secStr = sec < 10 ? "0" + sec : "" + sec;

        return minStr +":"+ secStr;
    }


}
