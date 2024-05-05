import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay} from "swiper/modules";
import Brands from "../components/Brands";

const HighlightedShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [shoeImagePath, setShoeImagePath] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/nike/");
      setShoes(response.data);
      console.log("Shoes: ", shoes);
    } catch (error) {
      console.log("There was an error when fetching the data", error);
    }
  };

  return (
    <div className="h-screen w-full pt-24 lg:pt-64 pl-2 lg:pl-0">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Онцлох Бараанууд</h1>
      </div>

      <div className="flex items-center justify-center flex-col auto pb-5 pt-12">
        <Swiper
          loop={true}
          autoplay={{
            delay: 100,
            disableOnInteraction: false
          }}
          breakpoints={{
            340: {
              slidesPerView: 2, // Adjusted to show one slide on small screens
              spaceBetween: 50, // Adjust the space between slides for mobile
            },
            700: {
              slidesPerView: 4,
              spaceBetween: 15, // Default space between slides for larger screens
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={{ FreeMode, Pagination, Autoplay }}
          className="w-full lg:max-w-[80%]"
        >
          {shoes.map((item, index) => (
            <SwiperSlide key={item.index}>
              <div className="flex flex-col rounded-xl group relative px-6 py-8 shadow-lg h-[150px] w-[215px] lg:h-[300px] lg:w-auto overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HighlightedShoes;
