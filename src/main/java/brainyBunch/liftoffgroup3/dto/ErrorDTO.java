package brainyBunch.liftoffgroup3.dto;

import org.springframework.http.HttpStatus;

public class ErrorDTO {

    private String errorMessage;
    private HttpStatus status;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public ErrorDTO(String errorMessage, HttpStatus status) {
        this.errorMessage = errorMessage;
        this.status = status;
    }

    public ErrorDTO() {
    }
}
