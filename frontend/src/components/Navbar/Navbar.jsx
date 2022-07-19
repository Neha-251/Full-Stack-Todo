import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = (props) => {
    // console.log(props)

    let navigate = useNavigate();
    let userdata = JSON.parse(localStorage.getItem("usercred")) || []
    const logout = () => {
        localStorage.removeItem("usercred");
        props.logout(false)
        navigate(`/`, { replace: false });

    }
    console.log(userdata)
    return <div className="navbar">
        {
            props.isLoggedIn ? <div><button className="btnNav" onClick={() => {
                logout()
            }}> Logout</button>
                <button className="btnNav">
                    <Link to="/todo">Todos</Link>
                </button>
            </div> : 
            <div>

                <button className="btnNav">
                    <Link to="/">Login</Link>
                </button>

                <button className="btnNav">
                    <Link to="/register">Registration</Link>
                </button>

            </div>
        }







    </div>
} 