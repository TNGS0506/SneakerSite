import React from "react";
import "../App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import FirstPage from '../components/FirstPage';
import HighlightedShoes from "../components/highlightedShoes";
import Brands from "../components/Brands";
import FourthSection from "../components/FourthSection";
import AllShoes from "../components/AllShoes";
import Feedback from '../components/Feedback';
import Email from '../components/Email';


function MainPage () {
    return (
        <div className="z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <FirstPage/>
            <HighlightedShoes/>
            <Brands/>
            <FourthSection/>
            <AllShoes/>
            <Feedback/>
            <Email/>
            </div>
        </div>
    );
    }
export default MainPage;