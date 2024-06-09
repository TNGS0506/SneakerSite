import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Shoes from "./pages/Shoes";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import Ending from './components/Ending'
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/Shoes/' element={<Shoes/>} />
        <Route path='/shoes/:shoeId' element={<ProductPage/>} />
        <Route path='/login/' element={<Login/>}/>
      </Routes>
      <Ending/>
    </BrowserRouter>
    
  );
}

export default App;
