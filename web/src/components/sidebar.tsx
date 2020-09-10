import React from "react";

import Style from "../css/sidebar.module.css";
import {Link} from "react-router-dom";
import { FiSettings,FiFilm,FiLogOut,FiBook} from "react-icons/fi";//Feather icon

const Sidebar = () =>{
    return(
        <div>
            <section className={Style.container}>
                <div className={Style.sidenav}>
                    <a href="#"><FiFilm /></a>
                    <a href="#"><FiSettings /></a>
                    <a href="#" className={Style.exitIcon}><FiLogOut /></a>
                    <Link to={"/author"}><FiBook/></Link>
                    <br/>
                    <br/>
                    <a href="#" className={Style.exitIcon}><FiLogOut /></a>
                </div>
            </section>
        </div>
  );
};

export default Sidebar;
