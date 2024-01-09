package brainyBunch.liftoffgroup3.controllers;

import brainyBunch.liftoffgroup3.model.LikedSongs;
import brainyBunch.liftoffgroup3.model.repository.LikedSongsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/liked-songs")
public class LikedSongsController {

    private final LikedSongsRepository likedSongsRepository;

    @Autowired
    public LikedSongsController(LikedSongsRepository likedSongsRepository) {
        this.likedSongsRepository = likedSongsRepository;
    }

    @PostMapping
    public void addLikedSong(@RequestBody LikedSongs likedSong) {
        likedSongsRepository.save(likedSong);
    }
}