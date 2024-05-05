import React from "react";
import Model from "./components/Model";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from './pages/FirstPage'
import HighlightedShoes from "./pages/highlightedShoes";
import Brands from "./components/Brands";




function App() {
  return (
    <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Navbar/>
      <FirstPage/>
      <HighlightedShoes/>
      <Brands/>
      </div>
    </div>
      
    </BrowserRouter>
  );
}

export default App;
