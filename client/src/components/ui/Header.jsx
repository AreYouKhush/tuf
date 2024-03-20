import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-11/12 bg-gray-200 px-6 py-3">
      <div className="font-amaranth font-semibold flex justify-between">
        <div className="text-2xl md:text-4xl">takeUforward</div>
        <div className="flex gap-2 lg-gap-10 justify-center items-center text-lg sm-text-2xl">
          <NavLink
            to="/"
            className="bg-orange-700 text-white font-amaranth rounded-full px-3 md-px-5 py-1 hover:bg-orange-800 duration-150"
          >
            <div>Form</div>
          </NavLink>
          <NavLink
            to="/data"
            className="bg-orange-700 text-white font-amaranth rounded-full px-3 md-px-5 py-1 hover:bg-orange-800 duration-150"
          >
            <div> Data</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
