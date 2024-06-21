import React from 'react';
import logo from './logo.svg';
import './App.css';

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import {Link, Route, Routes} from "react-router-dom";


const Home: React.FC = () => {
    return (
        <div className="App">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/home" className="navbar-brand">
                    un peu de serieux
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/home/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<TutorialsList/>}/>
                    <Route path="/tutorials" element={<TutorialsList/>}/>
                    <Route path="/add" element={<AddTutorial/>}/>
                    <Route path="/tutorials/:id" element={<Tutorial/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Home;
