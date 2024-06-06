import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddItem() {
    let navigate = useNavigate();

    const [item, setItem] = useState({
        itemName: "",
        itemDescription: "",
        whereToBuy: "",
        itemBarcode: "",
        totalNumber: 0,
        image: ""
    });

    const { itemName, itemDescription, whereToBuy, itemBarcode, totalNumber, image } = item;

    const onInputChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:8080/api/items/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setItem({ ...item, image: response.data });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/items", item);
        navigate("/");
    };

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add Item</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='ItemName' className='form-label'>
                                Item Name
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter item name'
                                name="itemName"
                                value={itemName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='ItemDescription' className='form-label'>
                                Item Description
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter item description'
                                name="itemDescription"
                                value={itemDescription}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='WhereToBuy' className='form-label'>
                                Where to Buy
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter where to buy'
                                name="whereToBuy"
                                value={whereToBuy}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='ItemBarcode' className='form-label'>
                                Item Barcode
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter item barcode'
                                name="itemBarcode"
                                value={itemBarcode}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='TotalNumber' className='form-label'>
                                Total Number
                            </label>
                            <input
                                type="number"
                                className='form-control'
                                placeholder='Enter total number of items'
                                name="totalNumber"
                                value={totalNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Image' className='form-label'>
                                Image
                            </label>
                            <input
                                type="file"
                                className='form-control'
                                name="image"
                                onChange={(e) => onFileChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
