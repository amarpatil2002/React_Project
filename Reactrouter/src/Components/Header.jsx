import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold">MyLogo</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8">
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="about">About</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="#">Services</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              <Link to="contact">Contact</Link>{" "}
            </li>
          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden bg-gray-800">
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              <Link to="about">About</Link>
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              <Link to="#">Services</Link>
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              <Link to="contact">Contact</Link>{" "}
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Header;
