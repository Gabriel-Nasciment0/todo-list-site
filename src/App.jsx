import { useState, useEffect } from "react"
import Dashboard from "./pages/Dashboard.jsx"
import "./styles/App.css"

export default function App() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks")
        return storedTasks ? JSON.parse(storedTasks) : []
    })
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    return (
        <Dashboard
            tasks={tasks}
            setTasks={setTasks}
        />
    )
}
