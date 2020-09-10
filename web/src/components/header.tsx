import logo from '../img/logo.png';
import React from "react";
import Header from "../css/header.module.css";

const LogoComponent = () =>{
  return (
      <div className = {Header.logo}>
          <img src={logo} alt="REALLY"/>
      </div>
  
  )

}
export default LogoComponent