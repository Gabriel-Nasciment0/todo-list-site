import { useState, useEffect } from "react"
import Dashboard from "./pages/Dashboard.jsx"
import "./styles/App.css"

export default function App() {
    const [tasks, setTasks] = useState(() => {
        try {
            const stored = localStorage.getItem("tasks")
            if (!stored) return []

            const parsed = JSON.parse(stored)
            if (!Array.isArray(parsed)) return []

            return parsed.map((t) => ({
                id: t.id ?? Date.now(),
                title: t.title ?? "",
                status: t.status ?? "todo",
                createdAt: t.createdAt ?? new Date().toISOString(),
                dueDate: t.dueDate ?? null,
                priority: t.priority ?? "medium",
            }))
        } catch (e) {
            console.error("Erro ao carregar tasks:", e)
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem("tasks", JSON.stringify(tasks))
        } catch (e) {
            console.error("Erro ao salvar tasks:", e)
        }
    }, [tasks])

    return (
        <Dashboard
            tasks={tasks}
            setTasks={setTasks}
        />
    )
}
