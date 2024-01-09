package brainyBunch.liftoffgroup3;

import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static org.springframework.test.util.AssertionErrors.assertNotNull;

//A unit test to test the connection to MySQL database
public class MySQLConnectionTest {

    private static final String URL = "jdbc:mysql://localhost:3306/music_spotify";
    private static final String USERNAME = "music_spotify";
    private static final String PASSWORD = "music_spotify";

    @Test
    public void testMySQLConnection() {
        try (Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD)) {
            assertNotNull("Connection should not be null", connection);
        } catch (SQLException e) {
            throw new RuntimeException("Connection error: " + e.getMessage(), e);
        }
    }
}