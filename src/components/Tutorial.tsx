import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import TutorialDataService from "../services/TutorialService";
import ITutorialData from "../types/Tutorial";

const Tutorial: React.FC = () => {
    const { id }= useParams();
    let navigate = useNavigate();

    const initialTutorialState = {
        id: null,
        name: "",
        discipline: "",
        active: false
    };
    const [currentTutorial, setCurrentTutorial] = useState<ITutorialData>(initialTutorialState);
    const [message, setMessage] = useState<string>("");

    const getTutorial = (id: string) => {
        TutorialDataService.get(id)
            .then((response: any) => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getTutorial(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };

    const updatePublished = (status: boolean) => {
        var data = {
            id: currentTutorial.id,
            name: currentTutorial.name,
            discipline: currentTutorial.discipline,
            active: status
        };

        TutorialDataService.update(currentTutorial.id, data)
            .then((response: any) => {
                console.log(response.data);
                setCurrentTutorial({ ...currentTutorial, active: status });
                setMessage("The status was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const updateTutorial = () => {
        TutorialDataService.update(currentTutorial.id, currentTutorial)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        TutorialDataService.remove(currentTutorial.id)
            .then((response: any) => {
                console.log(response.data);
                navigate("/clients");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentTutorial ? (
                        <div className="edit-form">
                            <h4>Tutorial</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name : </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={currentTutorial.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="discipline">Discipline : </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="discipline"
                                        name="discipline"
                                        value={currentTutorial.discipline}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <strong>Status:</strong>
                                    </label>
                                    {currentTutorial.active ? "Published" : "Pending"}
                                </div>
                            </form>

                            {currentTutorial.active ? (
                            <button
                                className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                            >
                                Unpublish
                            </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updatePublished(true)}
                            >
                                Publish
                            </button>
                    )}

                            <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
                                Delete
                            </button>

                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={updateTutorial}
                            >
                                Update
                             </button>
                            <p>{message}</p>
                        </div>
            ) : (
            <div>
                    <br />
                <p>You can click on a tutorial</p>
            </div>
)}
        </div>
);
};

export default Tutorial;
