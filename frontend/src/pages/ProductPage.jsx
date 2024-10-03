import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductPagestyle.css";
import RelatedProducts from "../components/RelatedProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { GET_SHOEBYID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { media } from "../constants";

const ProductPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { shoeId } = useParams();

  const { loading, error, data } = useQuery(GET_SHOEBYID, {
    variables: { id: parseInt(shoeId, 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shoe = data.shoeById;
  const images = shoe.images;
  const sizes = shoe.sizes;
  const categoryName = shoe.category.name;

  const handleMiniImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="h-auto w-screen overflow-x-hidden">
      <div className="flex flex-col gap-16 product-container mx-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            {images.length > 0 && (
              <img
                key={images[selectedImageIndex].image.id}
                src={
                  selectedImageIndex === null
                    ? media + shoe.image
                    : `${media}${images[selectedImageIndex]?.image}`
                }
                alt="Shoe"
                className="w-[70%] h-[70%] aspect-square object-cover cursor-pointer ml-4 rounded-xl lg:ml-36 lg:mt-20 border border-gray-400"
              />
            )}
            <div className="flex flex-row justify-center gap-3 h-24 lg:ml-36 mr-16">
              <Swiper
                loop={false}
                autoplay={{
                  delay: 500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  340: {
                    slidesPerView: images.length >= 3 ? 3 : images.length,
                    slidesPerGroup: images.length >= 3 ? 3 : images.length,
                    spaceBetween: 30,
                  },
                  700: {
                    slidesPerView: images.length >= 5 ? 5 : images.length,
                    slidesPerGroup: images.length >= 5 ? 5 : images.length,
                    spaceBetween: 15,
                  },
                }}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={{ FreeMode, Pagination, Autoplay }}
                className="w-full"
              >
                {images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      src={`${media}${image.image}`}
                      alt={`Shoe image ${image.id}`}
                      className="w-24 h-24 object-cover rounded-md cursor-pointer border border-gray-400"
                      onClick={() =>
                        handleMiniImageClick(
                          images.findIndex((img) => img.id === image.id)
                        )
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:w-2/4 mt-12 lg:mb-64 lg:pl-24">
            <div>
              <span className="text-violet-600 font-semibold">
                Special Sneaker
              </span>
              <h1 className="text-3xl font-bold">{shoe.name}</h1>
            </div>
            <p className="text-gray-700">{shoe.description}</p>
            <h6 className="text-2xl font-semibold">₮{shoe.price}</h6>
            <h1 className="mt-12">Бэлэн хэмжээнүүд:</h1>
            <div className="flex flex-row gap-2 items-center justify-start">
              {sizes.map((sizeObj, index) => (
                <h6
                  className="sizes p-2 border border-black rounded-md w-[8%] justify-center flex items-center"
                  key={index}
                >
                  {sizeObj.size}
                </h6>
              ))}
            </div>
          </div>
        </div>

        <RelatedProducts categoryName={categoryName} />
      </div>
    </div>
  );
};

export default ProductPage;
