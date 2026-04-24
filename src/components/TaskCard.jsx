import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import "./TaskCard.css"

export default function TaskCard({ task, setTasks }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [editDueDate, setEditDueDate] = useState(task.dueDate || "")
    const [editPriority, setEditPriority] = useState(task.priority || "medium")

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
            disabled: isEditing,
        })

    const handleDelete = () => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id))
    }

    const handleSaveEdit = () => {
        if (!editText.trim()) return

        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id
                    ? {
                          ...t,
                          title: editText.trim(),
                          dueDate: editDueDate || null,
                          priority: editPriority,
                      }
                    : t,
            ),
        )

        setIsEditing(false)
    }

    const handleCancelEdit = () => {
        setEditText(task.title)
        setEditDueDate(task.dueDate || "")
        setEditPriority(task.priority || "medium")
        setIsEditing(false)
    }

    const getDateStatus = () => {
        if (!task.dueDate) return ""

        const today = [
            new Date().getFullYear(),
            String(new Date().getMonth() + 1).padStart(2, "0"),
            String(new Date().getDate()).padStart(2, "0"),
        ].join("-")

        if (task.dueDate < today) return "late"

        const diffDays =
            (new Date(task.dueDate) - new Date(today)) / (1000 * 60 * 60 * 24)

        if (diffDays <= 5) return "soon"

        return "normal"
    }

    const dateStatus = getDateStatus()

    const formatDate = (date) => {
        const [year, month, day] = date.split("-")
        return `${day}/${month}/${year}`
    }

    return (
        <div
            ref={setNodeRef}
            className={`card ${isDragging ? "dragging" : ""}`}
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
                opacity: isDragging ? 0.5 : 1,
                zIndex: isDragging ? 1000 : "auto",
                touchAction: "none",
            }}
        >
            {!isEditing && (
                <div
                    className="drag-handle"
                    {...listeners}
                    {...attributes}
                >
                    ⠿
                </div>
            )}

            {isEditing ? (
                <div>
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />

                    <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                    />

                    <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                    >
                        <option value="high">Alta</option>
                        <option value="medium">Média</option>
                        <option value="low">Baixa</option>
                    </select>

                    <button onClick={handleSaveEdit}>Salvar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                </div>
            ) : (
                <>
                    <h3>{task.title}</h3>

                    {task.dueDate && (
                        <p
                            className={`due-date ${dateStatus} ${task.priority}`}
                        >
                            {formatDate(task.dueDate)}
                        </p>
                    )}

                    <div className={`priority ${task.priority}`}>
                        {task.priority === "high" && "Alta"}
                        {task.priority === "medium" && "Média"}
                        {task.priority === "low" && "Baixa"}
                    </div>

                    <button onClick={handleDelete}>Excluir</button>

                    <button
                        onClick={() => {
                            setIsEditing(true)
                            setEditText(task.title)
                            setEditDueDate(task.dueDate || "")
                            setEditPriority(task.priority || "medium")
                        }}
                    >
                        Editar
                    </button>
                </>
            )}
        </div>
    )
}
