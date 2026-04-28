import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core"
import { useEffect, useState } from "react"
import Column from "../components/Column.jsx"
import TopBar from "../components/TopBar.jsx"
import BoardHeader from "../components/BorderHeader.jsx"
import { TaskCardPreview } from "../components/TaskCard.jsx"
import "./Dashboard.css"

const VALID_STATUS = ["todo", "progress", "done"]

export default function Dashboard({ tasks, setTasks }) {
    /* Estados Desktop */
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

    /* Estados Mobile */
    const [activeColumn, setActiveColumn] = useState("todo")
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 920)
    const [isModalOpen, setIsModalOpen] = useState(false)

    /* Funcoes Desktop */
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

    const activeTask = tasks.find((task) => task.id === activeTaskId) || null

    /* Funcoes Mobile */
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 920)
        }

        handleResize()

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="container">
            <TopBar
                isMobile={isMobile}
                setFilter={setFilter}
                setSortType={setSortType}
            />

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
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isMobile={isMobile}
            />

            <div className="content">
                <DndContext
                    sensors={!isMobile ? sensors : undefined}
                    collisionDetection={closestCorners}
                    autoScroll={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    {isMobile && (
                        <div className="mobile-tabs">
                            <button
                                className={
                                    activeColumn === "todo" ? "active" : ""
                                }
                                onClick={() => setActiveColumn("todo")}
                            >
                                To Do
                            </button>

                            <button
                                className={
                                    activeColumn === "progress" ? "active" : ""
                                }
                                onClick={() => setActiveColumn("progress")}
                            >
                                Em Progresso
                            </button>

                            <button
                                className={
                                    activeColumn === "done" ? "active" : ""
                                }
                                onClick={() => setActiveColumn("done")}
                            >
                                Concluído
                            </button>
                        </div>
                    )}

                    <section className="board">
                        {isMobile ? (
                            <Column
                                status={activeColumn}
                                tasks={filteredTasks}
                                setTasks={setTasks}
                                sortType={sortType}
                                activeTaskId={activeTaskId}
                            />
                        ) : (
                            <>
                                <Column
                                    status="todo"
                                    {...{
                                        tasks: filteredTasks,
                                        setTasks,
                                        sortType,
                                        activeTaskId,
                                    }}
                                />
                                <Column
                                    status="progress"
                                    {...{
                                        tasks: filteredTasks,
                                        setTasks,
                                        sortType,
                                        activeTaskId,
                                    }}
                                />
                                <Column
                                    status="done"
                                    {...{
                                        tasks: filteredTasks,
                                        setTasks,
                                        sortType,
                                        activeTaskId,
                                    }}
                                />
                            </>
                        )}
                    </section>

                    <DragOverlay>
                        {activeTask ? (
                            <TaskCardPreview task={activeTask} />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <button
                className="fab"
                onClick={() => setIsModalOpen(true)}
                aria-label="Adicionar tarefa"
            >
                +
            </button>
        </div>
    )
}
