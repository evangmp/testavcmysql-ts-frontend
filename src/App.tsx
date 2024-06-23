import React, {useState} from 'react';
import './App.css';

import {Link, Route, Routes} from "react-router-dom";
import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";


const App: React.FC = () => {
    const [active, setActive] = useState(true);
    const [button_return, setButton_return] = useState(false);

    const return_back = () => {
        setActive(!active);
        setButton_return(!button_return);
    }
    const when_add_pressed = () => {
        setButton_return(!button_return);
    }
    const when_home_pressed = () => {
        setButton_return(true);
    }

    return (
        <div className="taskApp large-container-1">
            {active ? (
                <>
                    <div className="container-home-1">
                        <button className="button-home" onClick={return_back}>
                            skip connection
                        </button>
                    </div>
                </>) : (
                <>
                    <nav className="navbar-main">
                        <a href="/" className="navbar-brand">
                            un peu de serieux
                        </a>
                        <div className="container-home-3">
                            <li className="nav-main-item-1">
                                <Link to={"/"} className="nav-link-return" onClick={when_home_pressed}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-main-item-2">
                                <Link to={"/add"} className="nav-link-add" onClick={when_add_pressed}>
                                    Add
                                </Link>
                            </li>
                        </div>
                    </nav>
                    <div className="container-home-4">
                        <Routes>
                            <Route path="/" element={<TutorialsList/>}/>
                            <Route path="/tutorials" element={<TutorialsList/>}/>
                            <Route path="/add" element={<AddTutorial/>}/>
                            <Route path="/tutorials/:id" element={<Tutorial/>}/>
                        </Routes>
                    </div>
                    {button_return ? (<button onClick={return_back}>le boutton pour revenir en arrière avec un texte beaucoup trop long pour sa fonctionnalité
                    </button>) : null}

                </>
            )}



        </div>
    );
};

export default App;