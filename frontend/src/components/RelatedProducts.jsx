import "../styles/Related.css";
import ShoeCard from "./ShoeCard";
import { useQuery } from "@apollo/client";
import { GET_SHOESBYCAT } from "../../graphql/queries";
import { media } from "../constants";

// eslint-disable-next-line react/prop-types
const RelatedProducts = ({ categoryName }) => {
  const { loading, data, error } = useQuery(GET_SHOESBYCAT, {
    variables: { category: categoryName },
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.log(Error.message);
    return null;
  }

  const products = data.shoesByCategory;

  return (
    <div className="mx-4 lg:mx-24 related-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ShoeCard
          key={index}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          width="230px"
          height="150px"
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
