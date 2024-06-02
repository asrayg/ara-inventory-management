package com.ara.inventory_management.controller;

import com.ara.inventory_management.exception.ItemNotFoundException;
import com.ara.inventory_management.model.Item;
import com.ara.inventory_management.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin("http://localhost:3000/")
public class ItemController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(fileStorageLocation);
            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();

            return ResponseEntity.ok(fileDownloadUri);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload the file");
        }
    }

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        item.setItemName(itemDetails.getItemName());
        item.setItemDescription(itemDetails.getItemDescription());
        item.setWhereToBuy(itemDetails.getWhereToBuy());
        item.setItemBarcode(itemDetails.getItemBarcode());
        item.setTotalNumber(itemDetails.getTotalNumber());
        item.setImage(itemDetails.getImage());

        Item updatedItem = itemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        itemRepository.delete(item);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/add")
    public ResponseEntity<Item> addItem(@PathVariable Long id, @RequestParam int number) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        item.addItems(number);
        Item updatedItem = itemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }

    @PutMapping("/{id}/decrease")
    public ResponseEntity<Item> decreaseItem(@PathVariable Long id, @RequestParam int number) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));

        item.decreaseItems(number);
        Item updatedItem = itemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }

    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<Item> getItemByBarcode(@PathVariable String barcode) {
        Item item = itemRepository.findByItemBarcode(barcode)
                .orElseThrow(() -> new ItemNotFoundException(barcode));
        return ResponseEntity.ok(item);
    }

}
