import { useEffect, useState } from "react";
import "./user.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const Register = ({ logout }) => {

    const [pswVisible, setPswVisible] = useState(false);
    const navigate = useNavigate()

    const [reg, setreg] = useState({
        email: "",
        password: "",
        mobile: "",
        name: ""
    })


    const register = async () => {

        try {
            let response = await fetch("http://localhost:3008/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reg)
            })
            let data = await response.json()
            console.log("data", data)
          

            if (data) {
                
                localStorage.setItem("usercred", JSON.stringify(data))
                window.alert("Registration done")
                logout(true)
                navigate(`/todo`, { replace: false });
            }
            setreg({
                email: "",
                password: "",
                mobile: "",
                name: ""
            })

        } catch (error) {
            window.alert("error", error.message)
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
        <h1>Registration</h1>
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            register();


        }}>
            <input type="text" onChange={(e) => {
                setreg({ ...reg, name: e.target.value })
            }} required placeholder="Firstname Lastname" value={reg.name} />
            <input onChange={(e) => {
                setreg({ ...reg, email: e.target.value })
            }} type="email" name="email" required placeholder="firstname@email.com" value={reg.email} />

            <div>
                <input onChange={(e) => {
                    setreg({ ...reg, password: e.target.value })
                }} type="password" id="psw" name="password" required placeholder="********" value={reg.password} />
                <span>{pswVisible ? <AiOutlineEye onClick={() => setPswVisible(false)} /> : <AiOutlineEyeInvisible onClick={() => setPswVisible(true)} />}</span>
            </div>

            <input type="tel" onChange={(e) => {
                setreg({ ...reg, mobile: e.target.value })
            }} required placeholder="9000010000" value={reg.mobile} />
            <input className="btn" type="submit" />
        </form>

    </div>
}