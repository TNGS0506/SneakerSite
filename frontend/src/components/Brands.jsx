import React from 'react';
import { LogoImages } from '../constants';

const Brands = () => {
    return (
        <div className='bg-black h-auto lg:h-36 w-screen flex flex-col lg:flex-row mt-36 text-white overflow-x-hidden'>
            <div className='lg:w-1/3 items-center justify-center flex flex-col lg:ml-36 mt-6 mg:mb-6 lg:mt-0'>
                <div className='text-3xl font-bold mb-1 lg:mb-6 text-center'>Брэндүүд</div>
                <div className='text-center text-sm mb-2'>Бидний борлуулж буй дэлхийд танигдсан брэндүүд</div>
            </div>

            <div className='flex justify-center items-center lg:w-1/2 w-full overflow-x-hidden mx-1 ' >
                <div className="flex flex-row">
                    {LogoImages.map((logo, index) => 
                        (
                            <div key={index} className="brand-logo" style={{
                                backgroundImage: `url(${logo.backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "60px", // Smaller height for mobile
                                width: "60px", // Smaller width for mobile
                                marginRight: "10px",
                            }}>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )   
}

export default Brands;
