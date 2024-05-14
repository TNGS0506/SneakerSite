import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'


const ProductPage = () => {
    const [shoe, setShoe] = useState({})
    const [images, setImages] = useState([])


    useEffect(()=> {
        fetchData();
    },[])

    let { shoeId } = useParams();

    const fetchData = async () => {
        try{
            const res = await axios.get(`http://127.0.0.1:8000/shoes/${shoeId}/`);
            setShoe(res.data);
            setImages(res.data.images)
            console.table(res.data)
        }catch(err){
            console.log(err)
        }
    }
    


    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={shoe.image} alt="" className='w-[70%] h-[70%] aspect-square object-cover rounded-xl lg:ml-36 lg:mt-20'/>
                <div className='flex flex-row justify-between h-24 lg:ml-36 mr-16'>
                {
                    images.map((image, index) => {
                        return(
                            <img src={image.image} alt="" key={index} className='w-24 h-24 rounded-md cursor-pointer'/>
                        )
                    })
                }
                </div>
            </div>
            <div className='flex flex-col gap-4 lg:w-2/4'>
                <div>
                    <span className=' text-violet-600 font-semibold'>Special Sneaker</span>
                    <h1 className='text-3xl font-bold'>{shoe.name}</h1>
                </div>
                <p className='text-gray-700'>
                {shoe.description}
                </p>
                <h6 className='text-2xl font-semibold'>{shoe.price}</h6>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{shoe.price}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage