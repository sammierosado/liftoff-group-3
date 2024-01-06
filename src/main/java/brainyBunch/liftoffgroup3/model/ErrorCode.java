package brainyBunch.liftoffgroup3.model;

import org.springframework.http.HttpStatus;

public interface ErrorCode {

    String getCode();

    HttpStatus getHttpStatus();

}
