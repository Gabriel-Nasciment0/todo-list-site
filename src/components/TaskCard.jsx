import { useState } from "react"
import "./TaskCard.css"

export default function TaskCard({ task, setTasks }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [editDueDate, setEditDueDate] = useState(task.dueDate)
    const statusOrder = ["todo", "progress", "done"]
    const today = new Date()
    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-")

    const handleMoveBack = () => {
        setTasks((prevTasks) =>
            prevTasks.map((taskItem) => {
                if (task.id !== taskItem.id) return taskItem

                const currentIndex = statusOrder.indexOf(taskItem.status)

                if (currentIndex === 0) return taskItem

                return {
                    ...taskItem,
                    status: statusOrder[currentIndex - 1],
                }
            }),
        )
    }

    const handleMoveForward = () => {
        setTasks((prevTasks) =>
            prevTasks.map((taskItem) => {
                if (task.id !== taskItem.id) return taskItem

                const currentIndex = statusOrder.indexOf(taskItem.status)

                if (currentIndex === statusOrder.length - 1) return taskItem

                return {
                    ...taskItem,
                    status: statusOrder[currentIndex + 1],
                }
            }),
        )
    }

    const handleDelete = () => {
        setTasks((prevTasks) =>
            prevTasks.filter((taskItem) => task.id !== taskItem.id),
        )
    }

    const handleSaveEdit = () => {
        if (!editText.trim()) return

        setTasks((prevTasks) =>
            prevTasks.map((taskItem) => {
                if (task.id !== taskItem.id) return taskItem

                return {
                    ...taskItem,
                    title: editText,
                    dueDate: editDueDate || null,
                }
            }),
        )

        setIsEditing(false)
    }

    return (
        <div className={`card ${task.status}`}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                    />
                    <button onClick={() => setEditDueDate("")}>
                        Remover prazo
                    </button>
                    <button onClick={handleSaveEdit}>Salvar</button>
                    <button onClick={() => setIsEditing(false)}>
                        Cancelar
                    </button>
                </div>
            ) : (
                <div className="card-body">
                    <h3 className="card-title">{task.title}</h3>

                    <div className="card-dates">
                        {task.createdAt && (
                            <span>
                                {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                        )}

                        {task.dueDate &&
                            (() => {
                                const [year, month, day] =
                                    task.dueDate.split("-")
                                const isLate = task.dueDate < localToday

                                return (
                                    <span className={isLate ? "late" : ""}>
                                        {day}/{month}/{year}
                                    </span>
                                )
                            })()}
                    </div>

                    <div className="card-actions">
                        {task.status !== "todo" && (
                            <button onClick={handleMoveBack}>Voltar</button>
                        )}

                        {task.status !== "done" && (
                            <button onClick={handleMoveForward}>Avancar</button>
                        )}

                        <button onClick={handleDelete}>Excluir</button>

                        <button
                            onClick={() => {
                                setIsEditing(true)
                                setEditText(task.title)
                                setEditDueDate(task.dueDate || "")
                            }}
                        >
                            Editar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
