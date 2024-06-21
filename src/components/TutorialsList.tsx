import React, { useState, useEffect, ChangeEvent } from "react";
import TutorialDataService from "../services/TutorialService";
import ITutorialData from '../types/Tutorial';
import {Link} from "react-router-dom";

const TutorialsList: React.FC = () => {
    const [tutorials, setTutorials] = useState<Array<ITutorialData>>([]);
    const [currentTutorial, setCurrentTutorial] = useState<ITutorialData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchName, setSearchName] = useState<string>("");

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveTutorials = () => {
        TutorialDataService.getAll()
            .then((response: any) => {
                setTutorials(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial: ITutorialData, index: number) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

/*
    const removeAllTutorials = () => {
        TutorialDataService.removeAll()
            .then((response: any) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        TutorialDataService.findByTitle(searchTitle)
            .then((response: any) => {
                setTutorials(response.data);
                setCurrentTutorial(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    */

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchName}
                        onChange={onChangeSearchTitle}/>

                </div>
        </div>
            <div className="col-md-6">
                <h4>Tutorials List</h4>

                <ul className="list-group">
                    {tutorials && tutorials.map((tutorial, index) => (
                        <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                            onClick={() => setActiveTutorial(tutorial, index)}
                            key={index}
                        >
                            {tutorial.name}
                        </li>
                    ))}
                </ul>

            </div>

            <div className="col-md-6">
                {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                                {currentTutorial.name}
                            </div>

                            <div>
                                <label>
                                    <strong>Discipline:</strong>
                                </label>{" "}
                                {currentTutorial.discipline}
                            </div>

                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.active ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"/home/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                        <p>You can click on a tutorial</p>
                        </div>
                    )}
            </div>
        </div>
);
};

export default TutorialsList;
