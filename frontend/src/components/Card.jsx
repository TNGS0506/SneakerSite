import React from "react";

const ShoeCard = ({ shoe }) => {
  const { name, description, price, image } = shoe;

  return (
    <div className="card">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-price">${price}</p>
      </div>
    </div>
  );
};

export default ShoeCard;
