import { useState } from "react"
export default function TaskCard({ task, setTasks }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [editDueDate, setEditDueDate] = useState(task.dueDate)
    const statusOrder = ["todo", "progress", "done"]
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
        <div>
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
                <div>
                    <h1>{task.title}</h1>
                    {task.createdAt && (
                        <p>
                            Criada em:{" "}
                            {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                    )}
                    {task.dueDate &&
                        (() => {
                            const [year, month, day] = task.dueDate.split("-")
                            const isLate =
                                task.dueDate <
                                new Date().toISOString().split("T")[0]

                            return (
                                <p style={{ color: isLate ? "red" : "black" }}>
                                    Prazo: {day}/{month}/{year}
                                </p>
                            )
                        })()}
                    {task.status !== "todo" && (
                        <button onClick={handleMoveBack}>Voltar</button>
                    )}

                    {task.status !== "done" && (
                        <button onClick={handleMoveForward}>Avançar</button>
                    )}

                    <button onClick={handleDelete}>Deletar</button>
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
            )}
        </div>
    )
}
