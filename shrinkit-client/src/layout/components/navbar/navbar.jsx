import React from "react";
import logo from "../../../assets/ShrinkIt logo.svg";
import github from "../../../assets/github.png";
import linkedin from "../../../assets/linkedin.png";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <p>
          Shrink<span>It</span>
        </p>
      </div>
      <div className="right">
        <a
          href="https://github.com/aannaassalam/ShrinkIt"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github} alt="" />
          <span>Github</span>
        </a>
        <a
          href="https://www.linkedin.com/in/anas-alam-0207331b2/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedin} alt="" />
          <span>Anas Alam</span>
        </a>
      </div>
    </div>
  );
}
