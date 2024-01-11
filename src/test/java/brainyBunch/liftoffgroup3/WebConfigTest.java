package brainyBunch.liftoffgroup3;

import config.WebConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.test.web.servlet.MockMvc;

import

        static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import

        static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
//A test created to test CORS WebConfig functionality for Cross Server Interaction
@WebMvcTest(WebConfig.class)  // Test only the WebConfig class
public class WebConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCorsMappings() throws Exception {
        mockMvc.perform(get("/all")
                        .header("Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")) // Adjusted to match configuration
                .andExpect(header().string("Access-Control-Allow-Headers", "*")) // Adjusted to match configuration
                .andExpect(header().string("Access-Control-Allow-Credentials", "true"));
    }
}