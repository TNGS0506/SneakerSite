import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Allshoes.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Card } from 'flowbite-react'

const AllShoes = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/shoes/");
            setShoes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className=" swiper-container flex items-center justify-center flex-col auto lg:pb-5 pl-2 lg:pl-0 pt-36">
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    340: {
                        slidesPerView: 2.3, // Adjusted to show one slide on small screens
                        spaceBetween: 120, // Adjust the space between slides for mobile
                    },
                    700: {
                        slidesPerView: 6,
                        spaceBetween: 15, // Default space between slides for larger screens
                    },
                }}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={{ FreeMode, Pagination, Autoplay }}
                className="w-full lg:max-w-[80%] border-none"
            >
                {shoes.map((item, index) => (
                    <SwiperSlide key={item.index} className='border-none'>
                        <Card className="max-w-sm">
                            <div className="relative" style={{ width: "200px", height: "130px" }}>
                                <img
                                    src={item.image}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <div className="pl-2 pt-4">
                                <h5 className="text-xl tracking-tight text-gray-900 mb-5 dark:text-white">
                                    {item.name}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    ₮{item.price}
                                </p>
                            </div>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AllShoes;
