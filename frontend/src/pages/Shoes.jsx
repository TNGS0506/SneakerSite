import { useState, useEffect } from "react";
import ShoeCard from "../components/ShoeCard";
import "../styles/Shoes.css";
import { GET_ALLSHOES, GET_CATEGORIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const Shoes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all"); // Set default to "all"
  const [shoes, setShoes] = useState([]);
  const [categories, setCategories] = useState([]);

  const { data: data_shoes } = useQuery(GET_ALLSHOES);
  const { data: data_categories } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data_shoes) {
      console.log("shoes: ", data_shoes);
      setShoes(data_shoes.allShoes);
    }
  }, [data_shoes]);

  useEffect(() => {
    if (data_categories) {
      console.log("categories: ", data_categories);
      setCategories([
        { id: "all", name: "All Shoes" },
        ...data_categories.allCategories,
      ]);
    }
  }, [data_categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredShoes =
    selectedCategory && selectedCategory !== "all"
      ? shoes.filter((shoe) => shoe.category.id === selectedCategory)
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
          When you see someone putting on his Big Boots, you can be pretty sure
          that an Adventure is going to happen.
        </p>
      </div>

      <div className="AllContainer p-0 m-0 w-full">
        <div className="CategoryContainer">
          <ul className="UlSda">
            {categories
              .filter((category) => category.name !== "Highlights") // Exclude any specific categories if needed
              .map((category, index) => (
                <li
                  key={index}
                  className={`liElement font-bold text-xl ${
                    selectedCategory === category.id ? "active" : ""
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
