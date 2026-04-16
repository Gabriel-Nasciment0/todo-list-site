import { useState } from "react"
import Column from "../components/Column.jsx"
import TaskForm from "../components/TaskForm.jsx"
import FilterBar from "../components/FilterBar.jsx"
import "./Dashboard.css"

export default function Dashboard({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("")
    const [filter, setFilter] = useState("all")
    const [dueDate, setDueDate] = useState("")

    const handleAddTask = () => {
        const novaTask = {
            id: Date.now(),
            title: newTask,
            status: "todo",
            createdAt: new Date().toISOString(),
            dueDate: dueDate || null,
        }

        if (newTask.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, novaTask])
            setNewTask("")
            setDueDate("")
        }
    }

    const filteredTasks = tasks.filter(
        (task) =>
            filter === "all" ||
            (filter === "done" && task.status === "done") ||
            (filter === "pending" && task.status !== "done"),
    )

    return (
        <div className="container">
            <aside className="sidebar">
                <h2>Projects</h2>
                <p>To Do</p>
                <p>In Progress</p>
                <p>Done</p>
            </aside>
            <main className="main">
                <header className="header">
                    <TaskForm
                        newTask={newTask}
                        setNewTask={setNewTask}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        onAdd={handleAddTask}
                    />
                    <FilterBar
                        filter={filter}
                        setFilter={setFilter}
                    />
                </header>
                <section className="board">
                    <Column
                        status="todo"
                        setTasks={setTasks}
                        tasks={filteredTasks}
                    />
                    <Column
                        status="progress"
                        setTasks={setTasks}
                        tasks={filteredTasks}
                    />
                    <Column
                        status="done"
                        setTasks={setTasks}
                        tasks={filteredTasks}
                    />
                </section>
            </main>
        </div>
    )
}
