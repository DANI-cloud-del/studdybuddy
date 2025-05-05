"use client";

import React from "react";

export default function SearchBar() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>

      {/* Search Bar Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Glow Effects */}
        <div className="absolute w-[354px] h-[130px] blur-[30px] opacity-40 bg-glow" />
        <div className="absolute w-[312px] h-[65px] bg-dark-border" />
        <div className="absolute w-[303px] h-[59px] bg-border" />
        <div className="absolute w-[307px] h-[63px] bg-white" />

        {/* Search Input */}
        <div className="relative w-[301px] h-[56px] rounded-md bg-[#010201] flex items-center justify-between px-5">
          {/* Search Icon */}
          <div className="absolute left-5 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
              <line stroke="url(#searchl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stop-color="#f8e7f8" offset="0%"></stop>
                  <stop stop-color="#b6a9b7" offset="50%"></stop>
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stop-color="#b6a9b7" offset="0%"></stop>
                  <stop stop-color="#837484" offset="50%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full border-none bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none"
          />

          {/* Filter Icon */}
          <div className="absolute right-5 flex items-center justify-center w-10 h-10 bg-gradient-to-b from-[#161329] to-[#1d1b4b] rounded-md border border-transparent">
            <svg preserveAspectRatio="none" height="27" width="27" viewBox="4.8 4.56 14.832 15.408" fill="none">
              <path
                d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                stroke="#d6d6e6"
                stroke-width="1"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
