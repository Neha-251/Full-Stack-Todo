import { Routes, Route } from "react-router-dom"

import { Create } from '../components/Create';
import { Detail } from "../components/Detail";
import { Login } from '../components/Register/Login';
import { Navbar } from "../components/Navbar/Navbar";
import { Register } from "../components/Register/Register"
import { Todo } from '../components/Todo';
import { Protected } from "../components/Protected"
import { Renew } from "../components/Renew";
import { useState } from "react";


export const AllRoutes = () => {

    const [isLoggedIn, setisLoggedIn] = useState(false);

    const logout = (data) => {
      console.log(data, "getting")
      setisLoggedIn(data)
    }


    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} logout={logout} />
            <Routes>
                <Route path="/" element={<Login logout={logout} />}></Route>
                <Route path="/register" element={<Register logout={logout} />}></Route>

                <Route path="/todo" element={
                    <Protected isLoggedIn={isLoggedIn}>
                        <Todo />
                    </Protected>
                }></Route>
                <Route path="/create" element={<Create />}></Route>

                <Route path="/:taskId" element={
                    <Detail isLoggedIn={isLoggedIn} />

                }></Route>
                <Route path="/update/:taskId" element={<Renew />}></Route>
            </Routes>
        </>
    )
}