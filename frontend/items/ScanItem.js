import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ScanItem = () => {
  const webcamRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [item, setItem] = useState(null);
  const [updateNumber, setUpdateNumber] = useState(1);

  const handleScan = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      Quagga.decodeSingle({
        src: imageSrc,
        numOfWorkers: 0, 
        decoder: {
          readers: ["code_128_reader"] 
        },
      }, (result) => {
        if (result && result.codeResult) {
          setBarcode(result.codeResult.code);
        } else {
          console.log("No barcode detected.");
        }
      });
    }
  };

  useEffect(() => {
    if (barcode) {
      axios.get(`http://localhost:8080/api/items/barcode/${barcode}`)
        .then(response => {
          setItem(response.data);
        })
        .catch(error => {
          console.error('Error fetching item:', error);
          setItem(null);
        });
    }
  }, [barcode]);

  const updateItemCount = async (id, number, isIncrease) => {
    try {
      const action = isIncrease ? 'add' : 'decrease';
      await axios.put(`http://localhost:8080/api/items/${id}/${action}?number=${number}`);
      setItem(prevItem => ({
        ...prevItem,
        totalNumber: prevItem.totalNumber + (isIncrease ? number : -number)
      }));
    } catch (error) {
      console.error(`Error updating item count: ${error}`);
    }
  };

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <h2 className='text-center mb-4'>Scan Item</h2>
          <div className='text-center'>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="border rounded"
              style={{ width: '100%', height: 'auto' }}
            />
            <button className='btn btn-primary mt-3' onClick={handleScan}>Scan Barcode</button>
          </div>
          {item ? (
            <div className='mt-5'>
              <h3 className='text-center'>Item Details</h3>
              <div className="card border rounded shadow">
                <div className="card-header">
                  <h4>{item.itemName}</h4>
                </div>
                <div className="card-body">
                <li className="list-group-item">
                                    <b>Image: </b>
                                    <div>
                                        <img src={item.image} alt={item.itemName} style={{ width: '100px', height: '100px' }} onError={(e) => { e.target.onerror = null; e.target.src = "defaultImagePath" }} />
                                    </div>
                                </li>
                  <p><strong>Description:</strong> {item.itemDescription}</p>
                  <p><strong>Where to Buy:</strong> {item.whereToBuy}</p>
                  <p><strong>Barcode:</strong> {item.itemBarcode}</p>
                  <div className='d-flex justify-content-center align-items-center'>
                    <p className='mb-0 mr-3'><strong>Total Number:</strong></p>
                    <button className="btn btn-outline-secondary mx-2" onClick={() => updateItemCount(item.id, updateNumber, false)}>
                      -
                    </button>
                    <input 
                      type="number" 
                      value={updateNumber} 
                      onChange={(e) => setUpdateNumber(parseInt(e.target.value, 10))} 
                      className="form-control mx-2" 
                      style={{ width: '60px' }}
                    />
                    <button className="btn btn-outline-secondary mx-2" onClick={() => updateItemCount(item.id, updateNumber, true)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className='text-center mt-4'>No item found for the scanned barcode.</p>
          )}
        </div>
      </div>
      <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
    </div>
  );
};

export default ScanItem;
