import React, { useState, useEffect } from "react";
import axios from "axios";

import OtherCard from "../components/SpecialCard";

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
    <div className="h-screen w-full pt-20 bg-gray-100 mt-48">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Онцлох Бараанууд</h1>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mt-[76px]">
          {shoes.length > 0 ? (
            shoes.map((shoe, index) => <OtherCard key={index} shoe={shoe} />)
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-600">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightedShoes;
