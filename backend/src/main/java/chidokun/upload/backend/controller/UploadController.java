package chidokun.upload.backend.controller;

import chidokun.upload.backend.config.UploadConfig;
import chidokun.upload.backend.dto.Response;
import chidokun.upload.backend.util.FileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
public class UploadController {

    @Autowired
    private UploadConfig config;

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> upload(@RequestPart MultipartFile file) {
        String mimeType = FileUtils.getRealMimeType(file);
        if (!config.getAllowTypes().contains(mimeType)) {
            throw new RuntimeException("File type " + mimeType + " wasn't allowed." );
        }

        // my logic

        return ResponseEntity.ok(new Response(mimeType));
    }

    @PostMapping(path = "/check-file-type", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> checkFileType(@RequestPart MultipartFile file) {
        String mimeType = file.getContentType();
        return ResponseEntity.ok(new Response(mimeType));
    }

    @PostMapping(path = "/check-real-type", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> checkRealType(@RequestPart MultipartFile file) {
        String mimeType = FileUtils.getRealMimeType(file);
        return ResponseEntity.ok(new Response(mimeType));
    }
}
