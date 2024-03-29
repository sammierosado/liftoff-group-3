package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.exception.SpotifyException;
import brainyBunch.liftoffgroup3.model.SearchResult;
import brainyBunch.liftoffgroup3.services.SpotifyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.tools.jconsole.JConsoleContext;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/spotify")
@CrossOrigin
public class SpotifyController {


    @Autowired
    private SpotifyService spotifyService;


    @Autowired
    private ObjectMapper objectMapper;


    @RequestMapping(
            value = "/search",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> searchByTermAndType(@RequestParam("query") String query, @RequestParam("type") String type) {

        try {

            SearchResult searchResult = spotifyService.searchByTermAndType(query, type);
            System.out.println("searchResult = " + searchResult);
            return new ResponseEntity<>(objectMapper.writeValueAsString(searchResult), HttpStatus.OK);
        } catch(SpotifyException e) {

            JSONObject errorJsonObject = new JSONObject();
            errorJsonObject.put("message", e.getMessage());
            errorJsonObject.put("statusCode", e.getStatusCode().value());

            return new ResponseEntity<>(errorJsonObject.toString(), e.getStatusCode());
        } catch (JsonProcessingException e) {

            JSONObject errorJsonObject = new JSONObject();
            errorJsonObject.put("message", "Something went wrong!");
            errorJsonObject.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return new ResponseEntity<>(errorJsonObject.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
