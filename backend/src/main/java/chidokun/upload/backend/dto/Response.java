package chidokun.upload.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private int status;
    private String message;
    private String mimeType;

    public Response(String mimeType) {
        this.status = HttpStatus.OK.value();
        this.message = "Successful";
        this.mimeType = mimeType;
    }
}
