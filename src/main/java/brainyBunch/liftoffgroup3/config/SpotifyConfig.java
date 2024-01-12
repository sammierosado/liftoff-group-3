package brainyBunch.liftoffgroup3.config;

import brainyBunch.liftoffgroup3.dto.ErrorDTO;
import brainyBunch.liftoffgroup3.exception.SpotifyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import java.util.List;

@Component
//@ConfigurationProperties("spotify.api")

public class SpotifyConfig {
    @Value("${spotify.api.clientId}")
    private String clientId;
    @Value("${spotify.api.clientSecret}")
    private String clientSecret;
    @Value("${spotify.api.tokenUrl}")
    private String tokenUrl;
    @Value("${spotify.api.searchUrl}")
    private String searchUrl;
    @Value("${spotify.api.artistUrl}")
    private String artistUrl;

    @Autowired
    private RestTemplate restTemplate;


    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getTokenUrl() {
        return tokenUrl;
    }

    public void setTokenUrl(String tokenUrl) {
        this.tokenUrl = tokenUrl;
    }

    public String getSearchUrl() {
        return searchUrl;
    }

    public void setSearchUrl(String searchUrl) {
        this.searchUrl = searchUrl;
    }

    public String getArtistUrl() {
        return artistUrl;
    }

    public void setArtistUrl(String artistUrl) {
        this.artistUrl = artistUrl;
    }

    public SpotifyConfig(String clientId, String clientSecret, String tokenUrl, String searchUrl, String artistUrl) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tokenUrl = tokenUrl;
        this.searchUrl = searchUrl;
        this.artistUrl = artistUrl;
    }

    public SpotifyConfig() {
    }

    public String getAccessToken() {

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "client_credentials");
        requestBody.add("client_id", clientId);
        requestBody.add("client_secret", clientSecret);


        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity;

        try {
            responseEntity = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, String.class);
        } catch(RestClientException e) {
            System.out.println("Exception occurred while calling token URL: "+ e.getMessage());
            throw new SpotifyException("Exception occurred while calling token URL", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        JSONObject responseJsonObject = new JSONObject(responseEntity.getBody());
         return responseJsonObject.getString("access_token");
    }
}
