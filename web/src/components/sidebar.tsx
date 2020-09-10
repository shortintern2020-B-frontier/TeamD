import React from "react";

import Style from "../css/sidebar.module.css";
import { FiSettings, FiFilm, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div>
      <section className={Style.container}>
        <div className={Style.sidenav}>
          <a href="#">
            <FiFilm />
          </a>
          <a href="#">
            <FiSettings />
          </a>
          <br />
          <br />
          <a href="#">
            <FiLogOut />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
