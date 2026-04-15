import { useState } from "react"
import Column from "../components/Column.jsx"

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
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Nova Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button onClick={handleAddTask}>Adicionar</button>
            </div>
            <div>
                <button
                    onClick={() => setFilter("all")}
                    style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
                >
                    Todas
                </button>
                <button
                    onClick={() => setFilter("done")}
                    style={{
                        fontWeight: filter === "done" ? "bold" : "normal",
                    }}
                >
                    Concluídas
                </button>
                <button
                    onClick={() => setFilter("pending")}
                    style={{
                        fontWeight: filter === "pending" ? "bold" : "normal",
                    }}
                >
                    Pendentes
                </button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
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
            </div>
        </div>
    )
}
