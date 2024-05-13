import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants/index";
import { mylogo, menu, close, searchIcon, accountIcon, white_logo, black_account, black_search } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const location = useLocation();

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev);
  };

  const navbarBackgroundClass = location.pathname === '/' ? 'bg-black' : 'bg-white';
  const textColorClass = location.pathname === '/' ? 'text-white':'text-black font-bold' 
  const tsagaanLogo = location.pathname === '/' ?  mylogo : white_logo
  const accountIconUngu = location.pathname === '/' ? accountIcon: black_account;
  const searchIconUngu = location.pathname === '/' ? searchIcon : black_search 



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
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          {/* Render search icon */}
          <img src={searchIconUngu} alt="search" className={`w-6 h-6 ${textColorClass}`} onClick={toggleSearchInput} /> 

          {/* Render search input if showSearchInput is true */}
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1 rounded-md border bg-white border-gray-700 mr-4"
            />
          )}

          {/* Account Section */}
          <div className="flex items-center ml-4">
            <img src={accountIconUngu} alt="account" className={`w-6 h-6 ${textColorClass}`}/> 
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
