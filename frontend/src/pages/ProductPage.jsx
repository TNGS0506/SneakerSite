import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../styles/ProductPagestyle.css';
import RelatedProducts from '../components/RelatedProducts';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

const ProductPage = () => {
    const [shoe, setShoe] = useState({});
    const [images, setImages] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // New state to track the index of the selected big image

    useEffect(() => {
        fetchData();
    }, []);

    let { shoeId } = useParams();

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/shoes/${shoeId}/`);
            setShoe(res.data);
            setImages(res.data.images);
            setCategoryId(res.data.categoryId);
            console.table(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleMiniImageClick = (index) => {
        setSelectedImageIndex(index); // Update the selected image index when a mini image is clicked
    };

    return (
        <body className='h-auto w-screen overflow-x-hidden'> 
            <div className='flex flex-col gap-16 product-container mx-4'>
                <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
                    <div className='flex flex-col gap-6 lg:w-2/4'>
                        {shoe.image && images.length > 0 && (
                            <img src={selectedImageIndex === null ? shoe.image : images[selectedImageIndex]?.image} alt="" className='w-[70%] h-[70%] aspect-square object-cover cursor-pointer ml-4 rounded-xl lg:ml-36 lg:mt-20 border border-gray-400' />
                        )}
                        <div className='flex flex-row justify-center gap-3 h-24 lg:ml-36 mr-16'>
                            <Swiper 
                                loop={true}
                                autoplay={{
                                    delay: 500,
                                    disableOnInteraction: false
                                }}
                                breakpoints={{
                                    340: {
                                    slidesPerView: 3, // Adjusted to show one slide on small screens
                                    spaceBetween: 30, // Adjust the space between slides for mobile
                                    },
                                    700: {
                                    slidesPerView: 5,
                                    spaceBetween: 15, // Default space between slides for larger screens
                                    },
                                }}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={{ FreeMode, Pagination, Autoplay }}
                                className="w-full"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image.image}
                                            alt=""
                                            key={index}
                                            className='w-24 h-24 rounded-md cursor-pointer border border-gray-400'
                                            onClick={() => handleMiniImageClick(index)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 lg:w-2/4 mt-12 lg:mb-64 lg:pl-24'>
                        <div>
                            <span className='text-violet-600 font-semibold'>Special Sneaker</span>
                            <h1 className='text-3xl font-bold'>{shoe.name}</h1>
                        </div>
                        <p className='text-gray-700'>
                            {shoe.description}
                        </p>
                        <h6 className='text-2xl font-semibold'>₮{shoe.price}</h6>
                    </div>
                </div>
                <RelatedProducts shoeId={categoryId} />
            </div>
        </body>
    );
};

export default ProductPage;
