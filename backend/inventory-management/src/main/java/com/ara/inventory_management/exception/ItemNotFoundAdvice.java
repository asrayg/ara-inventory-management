package com.ara.inventory_management.exception;

import com.ara.inventory_management.exception.ItemNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ItemNotFoundAdvice {

    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<Object> handleItemNotFoundException(ItemNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", System.currentTimeMillis());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Not Found");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false));

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
}
