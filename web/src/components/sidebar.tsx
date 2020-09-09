import React from "react";

import Style from "../css/sidebar.module.css";
import { FiSettings,FiFilm,FiLogOut,FiBook} from "react-icons/fi";//Feather icon

const Sidebar = () =>{
    return(
        <div>
            <section className={Style.container}>
                <div className={Style.sidenav}>
                    <a href="#"><FiFilm /></a>
                    <a href="#"><FiSettings /></a>
                    <a href="./Author"><FiBook /></a>
                    <br/>
                    <br/>
                    <a href="#"><FiLogOut /></a>
                </div>
            </section>
        </div>
  );
};

export default Sidebar;
