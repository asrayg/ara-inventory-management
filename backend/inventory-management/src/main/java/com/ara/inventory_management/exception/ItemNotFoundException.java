package com.ara.inventory_management.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Long id) {
        super("Item not found with id: " + id);
    }
    public ItemNotFoundException(String id) {
        super("Item not found with id: " + id);
    }
}
