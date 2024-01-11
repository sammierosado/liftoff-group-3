package brainyBunch.liftoffgroup3.services.impl;

import brainyBunch.liftoffgroup3.config.SpotifyConfig;
import brainyBunch.liftoffgroup3.exception.SpotifyException;
import brainyBunch.liftoffgroup3.model.SearchResult;
import brainyBunch.liftoffgroup3.services.SpotifyService;
import brainyBunch.liftoffgroup3.util.SearchUtil;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class SpotifyServiceImpl  implements SpotifyService {
    @Autowired
    private SpotifyConfig spotifyConfig;

    @Autowired
    private SearchUtil searchUtil;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public SearchResult searchByTermAndType(String query, String type) {
        if(null == query  || "".equals(query.trim())) {
            throw new SpotifyException("Search query cannot be null or empty", HttpStatus.BAD_REQUEST);
        } else if(null == type || "".equals(type.trim())) {
            throw new SpotifyException("Search type cannot be null or empty", HttpStatus.BAD_REQUEST);
        }


        String accessToken = spotifyConfig.getAccessToken();
        System.out.println("Access Token: "+ accessToken);

        String searchUrl = spotifyConfig.getSearchUrl();

        String formattedSearchUrl = String.format(searchUrl, query.toLowerCase().trim(), type.toLowerCase().trim());
        System.out.println("Formatted URL: "+ formattedSearchUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        ResponseEntity<String> responseEntity;

        try {
            responseEntity = restTemplate.exchange(formattedSearchUrl, HttpMethod.GET, new HttpEntity<>(headers), String.class);
            System.out.println("Search Response Entity: "+ responseEntity);
        } catch(RestClientException e) {
            System.out.println("Exception occurred while calling search URL: "+e.getMessage());
            throw new SpotifyException("Exception occurred while calling search URL", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(null == responseEntity.getBody()) {
            throw new SpotifyException("Search result response is null", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        JSONObject resultJsonObject = new JSONObject(responseEntity.getBody());
        JSONArray itemsArray = new JSONArray();

        String typeLC = type.toLowerCase().trim();

        if("album".equals(typeLC)) {
            itemsArray = resultJsonObject.getJSONObject("albums").getJSONArray("items");
        } else if("artist".equals(typeLC)) {
            itemsArray = resultJsonObject.getJSONObject("artists").getJSONArray("items");
        } else if("track".equals(typeLC)) {
            itemsArray = resultJsonObject.getJSONObject("tracks").getJSONArray("items");
        }

        return searchUtil.formatSearchResult(itemsArray, typeLC);
    }

    }

