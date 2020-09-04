import React from "react";
import Sidebar from "../components/sidebar";
import styles from '../css/home.module.css';

const HomePage = () => {
  console.log(styles)
  console.log('hello')
  return (
    <div className={styles.above}>
      <Sidebar/>
    </div>

  );
};

export default HomePage;
