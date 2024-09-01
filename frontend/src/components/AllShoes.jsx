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
import { server } from "../constants";

const AllShoes = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(server + "allshoes/");
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
           
            slidesPerView: 1.5, 
            spaceBetween: 10, 
          },
          480: {
            
            slidesPerView: 2.7,
            spaceBetween: 20, 
          },
          768: {
           
            slidesPerView: 3.5, 
            spaceBetween: 30,
          },
          1024: {
            
            slidesPerView: 4.5,
            spaceBetween: 40,
          },
          1280: {
            
            slidesPerView: 5.1, 
            spaceBetween: 40,
          },
          1650: {
            slidesPerView: 6,
            spaceBetween: 40,
          }
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
