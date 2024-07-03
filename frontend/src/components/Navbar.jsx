import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants/index";
import { mylogo, menu, menu2, close, searchIcon, accountIcon, white_logo, black_account, black_search } from "../assets";
import "../styles/Navbar.css";
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/allshoes/')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.log(err));

    // Check authentication status when component mounts
    const authToken = localStorage.getItem(ACCESS_TOKEN);
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem(ACCESS_TOKEN);
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem(ACCESS_TOKEN)]);

  const location = useLocation();

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev);
    setShowDropdown(false);  
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navbarBackgroundClass = location.pathname === '/' ? 'bg-black' : 'bg-white';
  const textColorClass = location.pathname === '/' ? 'text-white' : 'text-black font-bold';
  const tsagaanLogo = location.pathname === '/' ? mylogo : white_logo;
  const accountIconUngu = location.pathname === '/' ? accountIcon : black_account;
  const searchIconUngu = location.pathname === '/' ? searchIcon : black_search;
  const menuIconUngu = location.pathname === '/' ? menu : menu2;

  const handleFilter = (event) => {
    const searchText = event.target.value.toLowerCase();
    setInputValue(event.target.value);
    const filtered = data.filter(item => item.name.toLowerCase().includes(searchText));
    setFilteredData(filtered);
    setShowDropdown(searchText.length > 0);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleSearchButtonClick = () => {
    const searchText = inputValue.toLowerCase();
    const filtered = data.filter(item => item.name.toLowerCase().includes(searchText));
    setFilteredData(filtered);
    setShowDropdown(true);
  };

  const handleItemClick = (id) => {
    setInputValue('');
    setShowDropdown(false);
    navigate(`/Shoes/${id}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-0 z-20 ${navbarBackgroundClass}`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className={`flex items-center gap-2 relative ${textColorClass}`}
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={tsagaanLogo} alt="logo" className="w-24 h-24 object-contain" />
        </Link>

        <ul className={`list-none hidden sm:flex flex-row gap-10 justify-center flex-grow ${textColorClass}`}>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`text-[18px] font-medium cursor-pointer ${active === link.title ? 'font-bold' : ''}`}
              onClick={() => setActive(link.title)}
            >
              <a href={`${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center lg:absolute lg:right-64 relative">
          {!showSearchInput && (
            <img src={searchIconUngu} alt="search" className={`w-6 h-6 ${textColorClass}`} onClick={toggleSearchInput} />
          )}

          {showSearchInput && (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  className="px-3 py-1 rounded-md border bg-white border-gray-700 mr-4 ml-4"
                  onChange={handleFilter}
                />
                <button 
                  onClick={handleSearchButtonClick} 
                  className="px-3 py-1 rounded-md border bg-blue-400 text-white border-gray-700 ml-2"
                >
                  Search
                </button>
              </div>
              {showDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-400 rounded-md shadow-lg z-50">
                  <ul>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <li key={item.id} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          <div onClick={() => handleItemClick(item.id)}>
                            {item.name}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No results found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {isLoggedIn && ( 
            <div className="flex items-center ml-4">
              <Link to={"/userProfile/"}>
              <img src={accountIconUngu} alt="account" className={`w-6 h-6 ${textColorClass}`} />
              </Link>
              
              <button className={`px-3 py-1 rounded-md border ${textColorClass} border-gray-700 ml-2`} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {!isLoggedIn && ( 
            <div className="ml-4">
              <Link to="/Login">
                <button className={`px-3 py-1 rounded-md border ${textColorClass} border-gray-700 ml-2`}>
                  Login
                </button>
              </Link>
              <Link to="/Register">
                <button className={`px-3 py-1 rounded-md border ${textColorClass} border-gray-700 ml-2`}>
                  Register
                </button>
              </Link>
            </div>
          )}

        </div>

        <div className="sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className={`w-[28px] h-[28px] object-contain cursor-pointer`}
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
