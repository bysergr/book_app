import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="nav">
      <Link to={"/"} className="navText">
        Search
      </Link>
    </header>
  );
}

export default Navbar;
