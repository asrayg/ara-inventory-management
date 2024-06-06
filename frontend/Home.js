import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/items");
            setItems(result.data);
        } catch (error) {
            console.error('Error loading items:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/items/${id}`);
            loadItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteItem(id);
        }
    };

    const updateItemCount = async (id, number, isIncrease) => {
        try {
            const action = isIncrease ? 'add' : 'decrease';
            await axios.put(`http://localhost:8080/api/items/${id}/${action}?number=${number}`);
            loadItems();
        } catch (error) {
            console.error(`Error updating item count: ${error}`);
        }
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Where to Buy</th>
                            <th scope="col">Barcode</th>
                            <th scope="col">Total Number</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img src={item.image} alt={item.itemName} style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td>{item.itemName}</td>
                                <td>{item.itemDescription}</td>
                                <td>{item.whereToBuy}</td>
                                <td>{item.itemBarcode}</td>
                                <td>
                                    <button className="btn btn-outline-secondary mx-1" onClick={() => updateItemCount(item.id, 1, false)}>
                                        -
                                    </button>
                                    {item.totalNumber}
                                    <button className="btn btn-outline-secondary mx-1" onClick={() => updateItemCount(item.id, 1, true)}>
                                        +
                                    </button>
                                </td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewitem/${item.id}`}>
                                        View
                                    </Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/edititem/${item.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger mx-2" onClick={() => handleDeleteClick(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
