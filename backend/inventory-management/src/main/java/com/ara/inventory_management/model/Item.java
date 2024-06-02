package com.ara.inventory_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String itemName;
    private String itemDescription;
    private String whereToBuy;
    private String itemBarcode;
    private int totalNumber;
    private String image; // URL or path to the image

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getWhereToBuy() {
        return whereToBuy;
    }

    public void setWhereToBuy(String whereToBuy) {
        this.whereToBuy = whereToBuy;
    }

    public String getItemBarcode() {
        return itemBarcode;
    }

    public void setItemBarcode(String itemBarcode) {
        this.itemBarcode = itemBarcode;
    }

    public int getTotalNumber() {
        return totalNumber;
    }

    public void setTotalNumber(int totalNumber) {
        this.totalNumber = totalNumber;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Methods to add and decrease the total number of items
    public void addItems(int number) {
        if (number > 0) {
            this.totalNumber += number;
        }
    }

    public void decreaseItems(int number) {
        if (number > 0 && this.totalNumber >= number) {
            this.totalNumber -= number;
        }
    }
}
