import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Link, Route, Routes} from "react-router-dom";
import Home from "./Home";


const App: React.FC = () => {
  return (
      <div className="App">
          <div className="container-home-1">
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/home"} className="nav-link">
                          skip connection
                      </Link>
                  </li>
              </div>
          </div>

          <div className="container mt-3">
              <Routes>
                  <Route path="/home/*" element={<Home/>}/>
              </Routes>
          </div>


      </div>
  );
}

export default App;
