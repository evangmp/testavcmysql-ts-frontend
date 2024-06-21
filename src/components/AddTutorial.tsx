import React, { useState, ChangeEvent } from "react";
import TutorialDataService from "../services/TutorialService";
import ITutorialData from '../types/Tutorial';

import { nanoid } from "nanoid";


const AddTutorial: React.FC = () => {
    const initialTutorialState = {
        id: `todo-${nanoid()}`,
        name: "",
        discipline: "",
        active: false,
    };
    const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);
    const [active, setActive] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    const saveTutorial = () => {
        var data = {
            id: tutorial.id,
            name: tutorial.name,
            discipline: tutorial.discipline,
            active: tutorial.active,
        };

        TutorialDataService.create(data)
            .then((response: any) => {
                console.log(tutorial);
                setTutorial({
                    id: response.data.id,
                    name: response.data.name,
                    discipline: response.data.discipline,
                    active: response.data.active,
                });
                setActive(true);
                console.log(response.data);
                console.log(response.config);
            })
            .catch((e: Error) => {
                console.log(e);
                console.log("erreureureur 1");
            });
    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setActive(false);
    };

    return (

        <div className="submit-form">
            {active ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>

                </div>) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Enter Name : </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={tutorial.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="discipline">Enter discipline : </label>
                        <input
                            type="text"
                            className="form-control"
                            id="discipline"
                            required
                            value={tutorial.discipline}
                            onChange={handleInputChange}
                            name="discipline"
                        />
                    </div>
                    <button onClick={saveTutorial} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>);
};

export default AddTutorial;
