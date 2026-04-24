import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    pointerWithin,
} from "@dnd-kit/core"
import { useState } from "react"
import Column from "../components/Column.jsx"
import TaskForm from "../components/TaskForm.jsx"
import FilterBar from "../components/FilterBar.jsx"
import "./Dashboard.css"

const VALID_STATUS = ["todo", "progress", "done"]

export default function Dashboard({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("")
    const [filter, setFilter] = useState("all")
    const [dueDate, setDueDate] = useState("")
    const [priority, setPriority] = useState("medium")

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
    )

    const handleAddTask = () => {
        const trimmed = newTask.trim()
        if (!trimmed) return

        const novaTask = {
            id: Date.now(),
            title: trimmed,
            status: "todo",
            createdAt: new Date().toISOString(),
            dueDate: dueDate || null,
            priority,
        }

        setTasks((prev) => [...prev, novaTask])

        setNewTask("")
        setDueDate("")
        setPriority("medium")
    }

    const handleDragEnd = ({ active, over }) => {
        if (!over) return

        const taskId = active.id
        const newStatus = over.id

        if (!VALID_STATUS.includes(newStatus)) return

        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t,
            ),
        )
    }

    const filteredTasks = tasks.filter(
        (task) =>
            filter === "all" ||
            (filter === "done" && task.status === "done") ||
            (filter === "pending" && task.status !== "done"),
    )

    return (
        <div className="container">
            {/* 🔹 HEADER GLOBAL (igual ao da imagem) */}
            <header className="topbar">
                <div className="topbar-left">
                    <h1>Welcome back 👋</h1>
                    <span>Seu workspace</span>
                </div>

                <div className="topbar-right">
                    <input placeholder="Search..." />
                    <button>Filter</button>
                    <button className="avatar">G</button>
                </div>
            </header>

            {/* 🔹 CONTEÚDO */}
            <div className="content">
                {/* Header da página */}
                <div className="page-header">
                    <TaskForm
                        newTask={newTask}
                        setNewTask={setNewTask}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        priority={priority}
                        setPriority={setPriority}
                        onAdd={handleAddTask}
                    />

                    <FilterBar
                        filter={filter}
                        setFilter={setFilter}
                    />
                </div>

                {/* Board */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={pointerWithin}
                    onDragEnd={handleDragEnd}
                >
                    <section className="board">
                        <Column
                            status="todo"
                            tasks={filteredTasks}
                            setTasks={setTasks}
                        />
                        <Column
                            status="progress"
                            tasks={filteredTasks}
                            setTasks={setTasks}
                        />
                        <Column
                            status="done"
                            tasks={filteredTasks}
                            setTasks={setTasks}
                        />
                    </section>
                </DndContext>
            </div>
        </div>
    )
}