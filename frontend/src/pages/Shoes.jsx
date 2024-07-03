import React, { useState, useEffect } from "react";
import fetchData from "../components/api";
import ShoeCard from "../components/ShoeCard";
import "../styles/Shoes.css";
import { GradientBackground } from "../constants/index.js";

const Shoes = () => {
  const [shoes, setShoes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getShoesData = async () => {
      const data = await fetchData("allshoes");
      if (data) {
        setShoes(data);
        console.table("shoes", data);
      } else {
        console.log("No data received");
      }
    };

    const getCategoriesData = async () => {
      const data = await fetchData("categories");
      if (data) {
        setCategories([{ id: "all", name: "All Shoes" }, ...data]);
        console.table("Categories", data);
      }
    };

    getShoesData();
    getCategoriesData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredShoes = selectedCategory && selectedCategory !== "all"
    ? shoes.filter((shoe) => shoe.category === selectedCategory)
    : shoes;

  return (
    <div className="shoesPageContainer">
      <div className="ZuragContainer">
        <div className="TextContainer">
          <h1 className="TextText">Jordan 4 Special Edition</h1>
          <p className="pStyle">
            Created by Tinker Hatfield in 1989, the silhouette features the
            colors of the Chicago Bulls, with a black nubuck design embellished
            with gray and red details. The shoe is finished off with a white
            midsole coupled with a red outsole.
          </p>
        </div>

        <div className="TheShoeContainer"></div>
      </div>

      <div className="UguulberContainer">
        <p>
        When you see someone putting on his Big Boots, you can be pretty sure that an Adventure is going to happen.
        </p>
      </div>

      <div className="AllContainer p-0 m-0 w-full">
        <div className="CategoryContainer">
          <ul className="UlSda">
            {categories
              .filter((category) => category.name !== "Highlights")
              .map((category, index) => (
                <li
                  key={index}
                  className={`liElement font-bold text-xl ${
                    selectedCategory === category.name ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="ShoesContainer">
          {filteredShoes.map((shoe, index) => (
            <ShoeCard
              key={index}
              id={shoe.id}
              image={shoe.image}
              name={shoe.name}
              price={shoe.price}
              width="250px"
              height="160px"
              {...shoe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shoes;
