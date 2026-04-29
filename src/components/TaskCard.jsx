import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import "./TaskCard.css"

function formatDate(date) {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
}

function getDateStatus(dueDate) {
    if (!dueDate) return ""

    const today = [
        new Date().getFullYear(),
        String(new Date().getMonth() + 1).padStart(2, "0"),
        String(new Date().getDate()).padStart(2, "0"),
    ].join("-")

    if (dueDate < today) return "late"

    const diffDays =
        (new Date(dueDate) - new Date(today)) / (1000 * 60 * 60 * 24)

    if (diffDays <= 5) return "soon"

    return "normal"
}

function TaskCardContent({
    task,
    onEdit,
    onDelete,
    onNextStatus,
    onPrevStatus,
}) {
    const dateStatus = getDateStatus(task.dueDate)

    return (
        <>
            <div className="card-header">
                <h3>{task.title}</h3>
            </div>

            {task.dueDate && (
                <p className={`due-date ${dateStatus} ${task.priority}`}>
                    {formatDate(task.dueDate)}
                </p>
            )}

            <div className={`priority ${task.priority}`}>
                {task.priority === "high" && "Alta"}
                {task.priority === "medium" && "Média"}
                {task.priority === "low" && "Baixa"}
            </div>

            <div className="card-actions status-controls">
                <button
                    className="icon-btn"
                    onClick={onPrevStatus}
                    disabled={task.status === "todo"}
                    aria-label="Mover para a coluna anterior"
                >
                    ←
                </button>

                <span className="status-label">
                    {task.status === "todo" && "A Fazer"}
                    {task.status === "progress" && "Em Progresso"}
                    {task.status === "done" && "Concluído"}
                </span>

                <button
                    className="icon-btn"
                    onClick={onNextStatus}
                    disabled={task.status === "done"}
                    aria-label="Mover para a próxima coluna"
                >
                    →
                </button>
            </div>

            <div className="card-actions card-footer">
                <button className="btn secondary" onClick={onEdit}>
                    Editar
                </button>
                <button className="btn danger" onClick={onDelete}>
                    Excluir
                </button>
            </div>
        </>
    )
}

export function TaskCardPreview({ task }) {
    return (
        <div className="card drag-overlay">
            <div className="drag-handle">:::</div>
            <TaskCardContent task={task} />
        </div>
    )
}

export default function TaskCard({ task, setTasks, isActiveDrag = false }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [editDueDate, setEditDueDate] = useState(task.dueDate || "")
    const [editPriority, setEditPriority] = useState(task.priority || "medium")

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task.id,
        disabled: isEditing,
    })

    const handleNextStatus = () => {
        const nextStatusMap = {
            todo: "progress",
            progress: "done",
            done: null,
        }

        const nextStatus = nextStatusMap[task.status]
        if (!nextStatus) return

        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? { ...t, status: nextStatus } : t,
            ),
        )
    }

    const handlePrevStatus = () => {
        const prevStatusMap = {
            todo: null,
            progress: "todo",
            done: "progress",
        }

        const prevStatus = prevStatusMap[task.status]
        if (!prevStatus) return

        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? { ...t, status: prevStatus } : t,
            ),
        )
    }

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

    const handleEdit = () => {
        setIsEditing(true)
    }

    const isGhost = isDragging || isActiveDrag

    return (
        <div
            ref={setNodeRef}
            className={`card ${isGhost ? "drag-placeholder" : ""}`}
        >
            {!isEditing && (
                <div
                    className="drag-handle"
                    {...listeners}
                    {...attributes}
                >
                    :::
                </div>
            )}

            {isEditing ? (
                <div className="card-edit">
                    <input
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />

                    <div className="edit-row">
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
                    </div>

                    <div className="edit-actions">
                        <button
                            className="btn primary"
                            onClick={handleSaveEdit}
                        >
                            Salvar
                        </button>

                        <button
                            className="btn secondary"
                            onClick={handleCancelEdit}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <TaskCardContent
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onNextStatus={handleNextStatus}
                    onPrevStatus={handlePrevStatus}
                />
            )}
        </div>
    )
}
