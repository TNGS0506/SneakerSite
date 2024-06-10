import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Allshoes.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Card } from "flowbite-react";
import arrow from "../assets/arrow.svg";
import { Link } from "react-router-dom";
import ShoeCard from "./ShoeCard";

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
      <div className="h-12 w-screen right-[35%] lg:mb-6 text-2xl">
        <h1 id="h1">Бүх пүүзнүүд</h1>
      </div>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            // Adjusted breakpoint for extra small devices
            slidesPerView: 1.5, // Show 1.5 slides on very small screens
            spaceBetween: 10, // Space between slides for very small screens
          },
          480: {
            // Adjusted breakpoint for small devices
            slidesPerView: 2.7, // Show 2.7 slides on small screens
            spaceBetween: 20, // Adjusted space between slides for small screens
          },
          768: {
            // Adjusted breakpoint for medium devices
            slidesPerView: 3.5, // Show 3.5 slides on medium screens
            spaceBetween: 30, // Adjusted space between slides for medium screens
          },
          1024: {
            // Adjusted breakpoint for large devices
            slidesPerView: 4.5, // Show 4.5 slides on large screens
            spaceBetween: 40, // Adjusted space between slides for large screens
          },
          1280: {
            // Adjusted breakpoint for extra large devices
            slidesPerView: 6, // Show 5 slides on extra large screens
            spaceBetween: 50, // Adjusted space between slides for extra large screens
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
          <SwiperSlide key={index} className="border-none">
            <ShoeCard
              id={item.id.toString()}
              image={item.image}
              name={item.name}
              price={item.price}
              width={"210px"}
              height={"150px"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex h-12 w-screen justify-end lg:pr-[165px] lg:mt-4 text-green-700">
        <Link to={`/Shoes`}>
          <h2 style={{ marginRight: "10px", cursor: "pointer", }}>Бүгдийг харах</h2>
        </Link>
        
        <img
          src={arrow}
          alt="Arrow Icon"
          style={{
            width: "20px",
            height: "20px",
            position: "relative",
            top: "2px",
          }}
        />
      </div>
    </div>
  );
};

export default AllShoes;
