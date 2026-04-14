import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import "./styles/App.css"

export default function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Estudar",
            status: "todo",
        },
        {
            id: 2,
            title: "treinar",
            status: "progress",
        },
        {
            id: 3,
            title: "trabalhar",
            status: "done",
        },
    ])
    return (
        <Dashboard
            tasks={tasks}
            setTasks={setTasks}
        />
    )
}
