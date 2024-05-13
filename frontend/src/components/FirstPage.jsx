import React from "react";
import Model from "./Model";
import { styles } from "../styles";
import ActiveSlider from "./ActiveSlider";

const FirstPage = () => {


  return (
    <section className="relative w-screen h-screen mx-auto bg-[#000000] mb-12">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[40px] max-w-10xl mx-auto flex flex-col h-auto  gap-5`}
      >
        <div>
          <h1 className={`${styles.heroHeadText} text-white `}>
            StreetWear & Sneakers
          </h1>
          <p className={`${styles.heroHeadText} mt-2 text-white-100`}>
            ...For Real...
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center top-32">
        <div
          className={`w-96 h-96 flex flex-col`}
        >
          {/* <Model /> */}
        </div>
      </div>


      <div className="relative top-[670px] lg:top-[600px]">
        <ActiveSlider/>
      </div>
      
      
    </section>
  );
};

export default FirstPage;
