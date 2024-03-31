import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

// Update baseUrl import to point to your backend server
import { baseUrl } from '../../../Url'; // Update this import

const AddProduct = () => {
    // Component state
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    // Handler for image input change
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    // Handler for input change
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Function to add product
    const Add_Product = async () => {
        try {
            // Form data for image upload
            let formData = new FormData();
            formData.append('product', image);

            // Upload image
            const responseImage = await fetch(`${baseUrl}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!responseImage.ok) {
                throw new Error('Failed to upload image');
            }

            const responseData = await responseImage.json();

            // Add product details with image URL
            const product = {
                ...productDetails,
                image: responseData.image_url
            };

            // Send product data to addproduct endpoint
            const responseProduct = await fetch(`${baseUrl}/addproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!responseProduct.ok) {
                throw new Error('Failed to add product');
            }

            // Reset form and show success message
            setProductDetails({
                name: "",
                category: "women",
                new_price: "",
                old_price: ""
            });
            setImage(null);
            alert("Product Added");
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to add product");
        }
    };


    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>

            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
