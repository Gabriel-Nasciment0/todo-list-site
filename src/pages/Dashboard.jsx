import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core"
import { useState } from "react"
import Column from "../components/Column.jsx"
import TopBar from "../components/TopBar.jsx"
import BoardHeader from "../components/BorderHeader.jsx"
import { TaskCardPreview } from "../components/TaskCard.jsx"
import "./Dashboard.css"

const VALID_STATUS = ["todo", "progress", "done"]

export default function Dashboard({ tasks, setTasks }) {
    const [newTask, setNewTask] = useState("")
    const [filter, setFilter] = useState("all")
    const [dueDate, setDueDate] = useState("")
    const [priority, setPriority] = useState("medium")
    const [sortType, setSortType] = useState("priority")
    const [activeTaskId, setActiveTaskId] = useState(null)
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

    const handleDragStart = ({ active }) => {
        setActiveTaskId(active.id)
    }

    const handleDragEnd = ({ active, over }) => {
        setActiveTaskId(null)

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

    const handleDragCancel = () => {
        setActiveTaskId(null)
    }

    const filteredTasks = tasks.filter(
        (task) =>
            filter === "all" ||
            (filter === "done" && task.status === "done") ||
            (filter === "pending" && task.status !== "done"),
    )

    const activeTask =
        tasks.find((task) => task.id === activeTaskId) || null

    return (
        <div className="container">
            <TopBar />

            <BoardHeader
                filter={filter}
                setFilter={setFilter}
                newTask={newTask}
                setNewTask={setNewTask}
                dueDate={dueDate}
                setDueDate={setDueDate}
                priority={priority}
                setPriority={setPriority}
                sortType={sortType}
                setSortType={setSortType}
                onAdd={handleAddTask}
            />

            <div className="content">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    autoScroll={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <section className="board">
                        <Column
                            status="todo"
                            tasks={filteredTasks}
                            setTasks={setTasks}
                            sortType={sortType}
                            activeTaskId={activeTaskId}
                        />
                        <Column
                            status="progress"
                            tasks={filteredTasks}
                            setTasks={setTasks}
                            sortType={sortType}
                            activeTaskId={activeTaskId}
                        />
                        <Column
                            status="done"
                            tasks={filteredTasks}
                            setTasks={setTasks}
                            sortType={sortType}
                            activeTaskId={activeTaskId}
                        />
                    </section>

                    <DragOverlay>
                        {activeTask ? <TaskCardPreview task={activeTask} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    )
}
