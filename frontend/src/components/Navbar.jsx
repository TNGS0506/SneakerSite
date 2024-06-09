import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants/index";
import { mylogo, menu, menu2, close, searchIcon, accountIcon, white_logo, black_account, black_search } from "../assets";
import "../styles/Navbar.css";
import axios from 'axios';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/allshoes/')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const location = useLocation();

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev);
    setShowDropdown(false);  // Hide dropdown when toggling search input
  };

  const navbarBackgroundClass = location.pathname === '/' ? 'bg-black' : 'bg-white';
  const textColorClass = location.pathname === '/' ? 'text-white' : 'text-black font-bold';
  const tsagaanLogo = location.pathname === '/' ? mylogo : white_logo;
  const accountIconUngu = location.pathname === '/' ? accountIcon : black_account;
  const searchIconUngu = location.pathname === '/' ? searchIcon : black_search;
  const menuIconUngu = location.pathname === '/' ? menu : menu2;

  const handleFilter = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = data.filter(item => item.name.toLowerCase().includes(searchText));
    setFilteredData(filtered);
    setShowDropdown(searchText.length > 0 && filtered.length > 0);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
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

        <div className="flex items-center lg:absolute lg:right-64 relative"> {/* Add relative class here */}
          <img src={searchIconUngu} alt="search" className={`w-6 h-6 ${textColorClass}`} onClick={toggleSearchInput} />

          {showSearchInput && (
            <div className="relative" ref={dropdownRef}> {/* Add ref here */}
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 rounded-md border bg-white border-gray-700 mr-4 ml-4"
                onChange={handleFilter}
              />
              {showDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <ul>
                    {filteredData.map((item) => (
                      <li key={item.id} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <Link to={`/Shoes/${item.id}`}>
                          {item.name}
                          {/* <img className="w-[20%] h-full ml-24" src={item.image}/> */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="hover-effect flex items-center ml-4">
            <img src={accountIconUngu} alt="account" className={`w-6 h-6 ${textColorClass}`} />
            <a href={"login"}></a>
          </div>
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
