import React from "react";

import Style from "../css/sidebar.module.css";

const Sidebar = () =>{
    return(
        <div className={Style.sidenav}>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
  );
};

export default Sidebar;
