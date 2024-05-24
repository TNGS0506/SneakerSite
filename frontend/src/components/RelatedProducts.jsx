import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/Related.css'
import ShoeCard from "./ShoeCard";



const RelatedProducts = ({shoeId}) => {
    const [products, setProduct] = useState([])

    useEffect(() => {
        if(shoeId){
            fetchData()
        }

    },[shoeId])

    const fetchData = async() => {
        try{
            const res = await axios.get(`http://127.0.0.1:8000/categories/${shoeId}/`)
            setProduct(res.data);
            console.table('relatedProducts data:',res.data);
        }catch(err){
            console.log('Failed to fetch related produtcts',err)
        }
            
    }



return (
    <div className="mx-4 lg:mx-24 related-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
            <ShoeCard 
                key={index}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                width="230px" 
                height="150px"
            />
        ))}
    </div>
    );
};

export default RelatedProducts;
