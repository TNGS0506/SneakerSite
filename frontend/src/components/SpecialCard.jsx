import React from "react";

const OtherCard = ({ shoe }) => {
  const { id, image, name } = shoe;

  return (
    <div className="other-card">
      <img
        src={image}
        alt={name}
        className="other-card-img"
        style={{ width: "300px", height: "300px", objectFit: "cover" }} // Adjusted width and height
      />
    </div>
  );
};

export default OtherCard;
