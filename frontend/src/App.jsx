import React from "react";
import Model from "./components/Model";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from './pages/FirstPage'
import HighlightedShoes from "./pages/highlightedShoes";
import Brands from "./components/Brands";
import FourthSection from "./pages/FourthSection";
import AllShoes from "./components/AllShoes";


function App() {
  return (
    <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar/>
      <FirstPage/>
      <HighlightedShoes/>
      <Brands/>
      <FourthSection/>
      <AllShoes/>
      </div>
    </div>
      
    </BrowserRouter>
  );
}

export default App;
