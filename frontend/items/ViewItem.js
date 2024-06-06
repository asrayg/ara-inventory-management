import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Barcode from "react-barcode";

export default function ViewItem() {
    const [item, setItem] = useState({
        itemName: "",
        itemDescription: "",
        whereToBuy: "",
        itemBarcode: "",
        totalNumber: 0,
        image: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadItem();
    }, []);

    const loadItem = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/items/${id}`);
            setItem(result.data);
        } catch (error) {
            console.error('Error loading item:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Item Details</h2>

                    <div className="card">
                        <div className="card-header">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Item Name: </b>
                                    {item.itemName}
                                </li>
                                <li className="list-group-item">
                                    <b>Description: </b>
                                    {item.itemDescription}
                                </li>
                                <li className="list-group-item">
                                    <b>Where to Buy: </b>
                                    {item.whereToBuy}
                                </li>
                                <li className="list-group-item">
                                    <b>Barcode: </b>
                                    
                                    {item.itemBarcode && (
                                        <div>
                                            <Barcode value={item.itemBarcode} width={1} height={50} />
                                        </div>
                                    )}
                                </li>
                                <li className="list-group-item">
                                    <b>Total Number: </b>
                                    {item.totalNumber}
                                </li>
                                <li className="list-group-item">
                                    <b>Image: </b>
                                    <div>
                                        <img src={item.image} alt={item.itemName} style={{ width: '100px', height: '100px' }} onError={(e) => { e.target.onerror = null; e.target.src = "defaultImagePath" }} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
