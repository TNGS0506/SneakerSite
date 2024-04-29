import react from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const HighlightedShoes = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/Highlights/");
      setShoes(response.data);
      console.log(shoes)
    } catch (error) {
      console.log("there was an error when fetching the data", error);
    }
  };

  return (
    <div className="h-screen w-full pt-[200px]">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold">Онцлох Бараанууд</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {shoes.map(shoe => (
          <div key={shoe.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={shoe.image} alt={shoe.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-semibold">{shoe.name}</h2>
            <p className="text-gray-600">${shoe.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightedShoes;
