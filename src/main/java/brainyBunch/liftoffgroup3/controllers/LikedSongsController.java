package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.LikedSongs;
import brainyBunch.liftoffgroup3.model.repository.LikedSongsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/liked-songs")
public class LikedSongsController {

    private final LikedSongsRepository likedSongsRepository;

    @Autowired
    public LikedSongsController(LikedSongsRepository likedSongsRepository) {
        this.likedSongsRepository = likedSongsRepository;
    }

//    @PostMapping
//    public void addLikedSong(@RequestBody LikedSongs likedSong) {
//        likedSongsRepository.save(likedSong);
//    }

    @PostMapping
    public void addLikedSong(@RequestBody LikedSongs likedSong) {
        System.out.println("Received Liked Song: " + likedSong.toString());
        likedSongsRepository.save(likedSong);
        System.out.println("Liked Song saved successfully!");
    }

    //get mapping for showing user liked songs
    //Passing username
    @GetMapping("/{username}")
    public ResponseEntity<List<LikedSongs>> findUserLikes(@PathVariable String username) {
        List<LikedSongs> userLikes = likedSongsRepository.findByUsername(username);
        System.out.println("Liked Song saved successfully!");
        return new ResponseEntity<>(userLikes, HttpStatus.OK);
    }


}