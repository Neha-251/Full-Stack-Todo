import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./todo.css";


export const Todo = () => {
    let userdata = JSON.parse(localStorage.getItem("usercred"))
    let navigate = useNavigate();
    const [todo, settodo] = useState();
    useEffect(() => {
        gettodo()
    }, [])
    const gettodo = async () => {
        try {
            let res = await fetch(`http://localhost:3008/task/${userdata.userId}`);
            let data = await res.json();
            settodo(data)
        } catch (error) {
            console.log(error.message)
            window.alert(error.message)
        }
    }

    const viewDetail = (taskId) => {
        navigate(`/${taskId}`, { replace: false });
    }
    return <div>
        <h1>Todos</h1>
        <button className="btnNormal" onClick={() => {
            navigate(`/create`, { replace: false });
        }} style={{ marginBottom: "10px", cursor: "pointer" }}>Create New Todo</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Time Expiry</th>
                    <th>View</th>
                </tr>


            </thead>
            <tbody>
                {todo ? todo.map((e) => {
                    return <tr key={e.taskId}>
                        <td>{e.title}</td>
                        <td>{e.expiry}</td>
                        <td className="btnNormal" onClick={() => {
                            viewDetail(e.taskId)
                        }}>Click Me</td>

                    </tr>
                }) : null}
            </tbody>
        </table>

    </div>
}