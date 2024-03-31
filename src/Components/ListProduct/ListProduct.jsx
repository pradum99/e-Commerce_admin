import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';
import { baseUrl } from '../../../Url';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseUrl}/allproducts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setAllProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/removeproduct`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
            if (!response.ok) {
                throw new Error('Failed to remove product');
            }
            await fetchProducts();
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="listproduct-allproducts">
                    <hr />
                    {allproducts.map((product, index) => (
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <img src={product.image} className='listproduct-product-icon' alt={product.name} />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Remove" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListProduct;
