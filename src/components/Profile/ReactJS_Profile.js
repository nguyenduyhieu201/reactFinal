import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import Login from "../Login/ReactJS_Login";
import "../../App.css";

const ReactJS_Profile = () => {
    const { userId, token } = useContext(LoginContext);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        if (userId) {
            axios({
                method: "get",
                url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`,
                headers: { Authorization: token },
            }).then(({ data }) => {
                setPerson({
                    name: data.name,
                    id: data.id,
                });
            });
        }
    }, [userId, token]);

    if (userId === null) {
        return (
            <div>
                <div className="profileDoc">you need to login to continue</div>
                <Login />
            </div>
        )
    }

    else {
        return (
            <div className="profileDoc">
                <p>ID: {person?.name}</p>
                <p>Name: {person?.id}</p>
            </div>
        );
    }
}

export default ReactJS_Profile;