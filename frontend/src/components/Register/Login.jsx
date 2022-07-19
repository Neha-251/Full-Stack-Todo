import { useState } from "react"
import "./user.css";
import { useNavigate } from "react-router-dom";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import { useEffect } from "react";

export const Login = ({ logout }) => {
    let navigate = useNavigate();

    const [pswVisible, setPswVisible] = useState(false);
    console.log('pswVisible', pswVisible)

    const [user, setuser] = useState({
        email: "",
        password: ""

    })
    const login = async () => {
        
        try {
            let response = await fetch("http://localhost:3008/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            let data = await response.json();
            data.message ? window.alert(data.message) : localStorage.setItem("usercred", JSON.stringify(data))
            if (!data.message) {
                window.alert("Login done")
                logout(true)
                navigate(`/todo`, { replace: false });
            } else {
                window.alert(data.message)
            }

            setuser({
                email: "",
                password: ""
            })


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        let psw = document.getElementById("psw");
        if(pswVisible){
            psw.type = "text"
        } else {
            psw.type = "password"
        }

    }, [pswVisible])


    return <div className="register_mainDiv">
        <h1>Login</h1>
        <form
            action="" onSubmit={(e) => {
                e.preventDefault();
                login();
            }}>
            <input onChange={(e) => {
                setuser({ ...user, email: e.target.value })

            }} type="email" name="email"  value={user.email} required placeholder="abc@email.com" />

            <div>
            <input onChange={(e) => {
                setuser({ ...user, password: e.target.value })
            }} type="password" id="psw" name="password" value={user.password} required placeholder="********" />

            <span>{ pswVisible? <AiOutlineEye onClick={()=> setPswVisible(false)}/> : <AiOutlineEyeInvisible onClick={()=> setPswVisible(true)}/> }</span>
            </div>
            

            <input className="btn" type="submit" />
        </form>

    </div>
}