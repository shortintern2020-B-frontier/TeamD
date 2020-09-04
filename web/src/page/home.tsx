import React from "react";
import styles from "../css/home.module.css";

const HomePage = () => {
  return (
  <div className={styles.sidenav}>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Clients</a>
    <a href="#">Contact</a>
  </div>);
};

export default HomePage;
