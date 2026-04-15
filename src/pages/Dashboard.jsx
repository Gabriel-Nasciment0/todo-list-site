import { useState } from "react"
import Column from "../components/Column.jsx"

export default function Dashboard({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("")

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, novaTask])
            setNewTask("")
        }
        const novaTask = {
            id: Date.now(),
            title: newTask,
            status: "todo",
        }
    }
    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Nova Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Adicionar</button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
                <Column
                    status="todo"
                    setTasks={setTasks}
                    tasks={tasks}
                />
                <Column
                    status="progress"
                    setTasks={setTasks}
                    tasks={tasks}
                />
                <Column
                    status="done"
                    setTasks={setTasks}
                    tasks={tasks}
                />
            </div>
        </div>
    )
}
