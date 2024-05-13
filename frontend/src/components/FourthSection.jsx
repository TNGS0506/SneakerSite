import React from 'react';
import { JordanReklam } from '../constants/index.js';
import '../styles/style.css'; // Import CSS file for styling

const FourthSection = () => {
    return (
        <div className='container mt-36'>
            {/* Desktop layout */}
            <div className='desktop-layout lg:flex'>
                {/* Left side (photo) */}
                <div className='photo lg:w-1/2 h-72 relative bottom-8' style={{ backgroundImage: `url(${JordanReklam})` }}></div>
                {/* Right side (text) */}
                <div className='text lg:w-1/2'>
                    <div className='quote'>"Minimal words, maximum style with Air Jordans."</div>
                    <div className='description'>
                        "Jordan 1 High" нь шагайнаас дээш өргөгдсөн өндөр загвартай уг гутлын анхна бөгөөд бэлэг тэмдэг болсон хувилбар юм. Энэ нь сонгодог гоо зүйн үзэмжээрээ өндөр үнэлэгддэг бөгөөд олон арван жилийн турш тамирчид, загвар сонирхогчид, пүүз цуглуулагчид өмсөж ирсэн.
                    </div>
                </div>
            </div>
            {/* Mobile layout */}
            <div className='mobile-layout'>
                {/* Photo on top */}
                <div className='photo-mobile' style={{ backgroundImage: `url(${JordanReklam})` }}></div>
                {/* Text below */}
                <div className='text-mobile'>
                    <div className='quote-mobile mb-6'>"Minimal words, maximum style with Air Jordans."</div>
                    <div className='description-mobile'>
                        'Jordan 1 High' нь шагайнаас дээш өргөгдсөн өндөр загвартай уг гутлын анхна бөгөөд бэлэг тэмдэг болсон хувилбар юм. Энэ нь сонгодог гоо зүйн үзэмжээрээ өндөр үнэлэгддэг бөгөөд олон арван жилийн турш тамирчид, загвар сонирхогчид, пүүз цуглуулагчид өмсөж ирсэн.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FourthSection;
