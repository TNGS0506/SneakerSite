import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/Related.css'




const RelatedProducts = ({shoeId}) => {
    const [products, setProduct] = useState([])
    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async() => {
        try{
            const res = await axios.get(`http://127.0.0.1:8000/categories/${shoeId}`)
            setProduct(res.data);
            console.table(res.data);
        }catch(err){
            console.log(err)
        }
            
    }



return (
    <div className="related-products">
        {products.map((product, index) => (
            <div key={index} className="product-card" style={{backgroundImage: `url(${product.image})`}}>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>₮{product.price}</p>
            </div>
        ))}
    </div>
    );
};

export default RelatedProducts;
