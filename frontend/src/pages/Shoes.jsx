import React, { useState, useEffect } from 'react';
import fetchData from '../components/api';
import ShoeCard from '../components/ShoeCard';
import '../styles/Shoes.css'; // Assuming you have a CSS file for styles
import {GradientBackground} from '../constants/index.js'





const Shoes = () => {
    const [shoes, setShoes] = useState([]);
    const [categories, setCategories] = useState([]);

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
                setCategories(data);
                console.table("Categories", data);
            }
        };

        getShoesData();
        getCategoriesData();
    }, []);








    return (
        <div className='shoesPageContainer'>
            <div className='ZuragContainer'>
                <div className='TextContainer'>
                    <h1 className='TextText'>
                        Jordan 4 Special Edition
                    </h1>
                    <p className='pStyle'>
                    Created by Tinker Hatfield in 1989, the silhouette features the colors of the Chicago Bulls, with a black nubuck design embellished with gray and red details. The shoe is finished off with a white midsole coupled with a red outsole.
                    </p>
                </div>

                <div className='TheShoeContainer'>
                </div>

            </div>


            <div className='UguulberContainer'>
                <p>Phasellus eleifend, metus ac egestas suscipit, quam lacus mattis dolor, at tincidunt massa metus et nunc. Nam pharetra arcu tortor, vulputate vulputate neque semper ac. Etiam purus ligula.</p>
            </div>
            <div className='AllContainer p-0 m-0 w-full'>
                <div className='CategoryContainer'>
                <ul className='UlSda'>
                    {categories
                        .filter(category => category.name !== "Highlights")
                        .map((category, index) => (
                    <li key={index} className='liElement'>{category.name}</li>
                ))}
                </ul>
                
                </div>

                <div className='ShoesContainer'>
                    {shoes.map((shoe, index) => (
                        <ShoeCard key={index} id={shoe.id} image={shoe.image} name={shoe.name} price={shoe.price} width="250px" height="160px" {...shoe}/>

                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Shoes;
