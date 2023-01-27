import React from "react";
import { Link } from "react-router-dom";

function LinkBook({ refProp = undefined, to, title }) {
  if (!refProp) {
    return (
      <li className="link">
        <Link to={to}>{title}</Link>
      </li>
    );
  }

  return (
    <li ref={refProp} className="link">
      <Link to={to} >
        {title}
      </Link>
    </li>
  );
}

export default LinkBook;
