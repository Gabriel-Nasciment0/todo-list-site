import { useState, useEffect } from "react"
import Dashboard from "./pages/Dashboard.jsx"
import "./styles/App.css"

export default function App() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks")
        if (!storedTasks) return []
        try {
            const parsed = JSON.parse(storedTasks)
            return Array.isArray(parsed) ? parsed : []
        } catch (error) {
            console.error("Failed to parse tasks from localStorage:", error)
            return []
        }
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
