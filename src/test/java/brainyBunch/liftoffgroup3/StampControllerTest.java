package brainyBunch.liftoffgroup3;
import brainyBunch.liftoffgroup3.controllers.StampController;
import brainyBunch.liftoffgroup3.models.stamp;
import brainyBunch.liftoffgroup3.model.repository.StampRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.mockito.ArgumentCaptor;

import java.util.ArrayList;
import java.util.List;

import

        static

        org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import

        static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)

public

class StampControllerTest {

    @Mock
    private StampRepository stampRepository;

    @InjectMocks
    private StampController stampController;

    @Test
    public void viewAllStampsTest() {
        // Create a list of mock stamps
        List<stamp> mockStamps = new ArrayList<>();
        mockStamps.add(new stamp());
        mockStamps.add(new stamp());

        // Mock the behavior of the repository
        when(stampRepository.findAll()).thenReturn(mockStamps);

        // Call the method under test
        Model model = new ExtendedModelMap();  // Use a model implementation for testing
        String viewName = stampController.viewAllStamps(model);

        // Assert the expected results
        assertEquals("/stamplist", viewName);
        assertEquals(mockStamps, model.getAttribute("allStamps"));
    }

    @Test
    public void saveTimestampTest() {
        // Call the method under test
        String viewName = stampController.saveTimestamp(new ExtendedModelMap());

        // Assert the expected results
        assertEquals("templates/stamplist", viewName);

        // Verify that the repository's save method was called with the correct stamp
        ArgumentCaptor<stamp> stampCaptor = ArgumentCaptor.forClass(stamp.class);
        verify(stampRepository).save(stampCaptor.capture());

        stamp savedStamp = stampCaptor.getValue();
        // Assert the properties of the saved stamp
        assertNotNull(savedStamp.getStampTime());
        assertEquals("Some action description", savedStamp.getActionDescription());
    }
}