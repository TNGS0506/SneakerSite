import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/ShoeCard.css'

const ShoeCard = ({ id, image, name, price, width, height }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Link to={`/Shoes/${id}`} className="block border-none relative">
            <Card className="max-w-sm lg:max-w-none border-none rounded-lg">
                <div className="relative rounded-xl" style={{ width: `${width}`, height: `${height}` }}>
                    <img
                        src={image}
                        className="relative inset-0 rounded-lg w-full h-full object-cover"
                    />
                    <div 
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite();
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faHeart} 
                            size="lg" 
                            color={isFavorite ? "red" : "white"}
                        />
                    </div>
                </div>
                <div className="pl-2 pt-2">
                    <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                        {name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        ₮{price}
                    </p>
                </div>
            </Card>
        </Link>
    );
};

export default ShoeCard;
