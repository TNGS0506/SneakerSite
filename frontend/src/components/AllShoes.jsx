import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Allshoes.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Card } from 'flowbite-react'
import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom';


const AllShoes = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/allshoes/");
            setShoes(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="swiper-container sm:ml-10 flex items-center justify-center flex-col lg:pb-5 pl-2 lg:pl-0 pt-36">
            <div className='h-12 w-screen right-[35%] lg:mb-6 text-2xl'>
                <h1 id='h1'>
                    Бүх пүүзнүүд
                </h1>
            </div>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    340: {
                        slidesPerView: 2.7, // Adjusted to show one slide on small screens
                        spaceBetween: 90, // Adjust the space between slides for mobile
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
                    <SwiperSlide key={index} className='border-none'>
                        <Link to={`/Shoes/${item.id.toString()}`} className="block border-none">
                            <Card className="max-w-sm lg:max-w-none border-none rounded-lg">
                                <div className="relative rounded-xl" style={{ width: "180px", height: "130px" }}>
                                    <img
                                        src={item.image}
                                        className="relative inset-0 rounded-lg w-full h-full object-cover"
                                    />
                                </div>
                                <div className="pl-2 pt-2">
                                    <h5 className="text-xl tracking-tight text-gray-900  dark:text-white">
                                        {item.name}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        ₮{item.price}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    </SwiperSlide>
                ))}

            </Swiper>
            <div className='flex h-12 w-screen justify-end lg:pr-[165px] lg:mt-4 text-green-700'>
                <h2 style={{marginRight: "10px"}}>Бүгдийг харах</h2>
                <img src={arrow} alt="Arrow Icon" style={{width: "20px", height: "20px", position: "relative", top: "2px"}} />
            </div>

        </div>
    );
};

export default AllShoes;
