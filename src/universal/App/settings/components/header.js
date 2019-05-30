import React from 'react';
import { NavLink } from 'react-router-dom';
const Header1 = () => {
    return(
        <div >
          <header className="navbar navbar-expand-lg navbar-primary bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                  <li><NavLink className="nav-link" to="/shop-details">Shop-Details </NavLink></li>
                  <li><NavLink className="nav-link" to="/measurement">Measurement </NavLink></li>
                  <li><NavLink className="nav-link" to="/menus">Menus </NavLink></li>
              </ul>
            </div>
          </header>
        </div>
    )
}
export default Header1;
