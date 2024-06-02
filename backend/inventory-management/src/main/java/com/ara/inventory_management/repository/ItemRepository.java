package com.ara.inventory_management.repository;

import com.ara.inventory_management.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByItemBarcode(String itemBarcode);
}

