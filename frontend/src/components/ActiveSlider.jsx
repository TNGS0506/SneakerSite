import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "../constants";

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col auto bg-black lg:pb-5 pl-2 lg:pl-0">
      <Swiper
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false
        }}
        breakpoints={{
          340: {
            slidesPerView: 2, // Adjusted to show one slide on small screens
            spaceBetween: 30, // Adjust the space between slides for mobile
          },
          700: {
            slidesPerView: 3,
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
        {ServiceData.map((item, index) => (
          <SwiperSlide key={index}> {/* Use index as the key */}
            <div className="flex flex-col group relative px-6 py-8 shadow-lg h-[150px] w-[215px] lg:h-[300px] mx-2 lg:w-auto overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundImage: `url(${item.backgroundImage})`,
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
  );
};

export default ActiveSlider;

