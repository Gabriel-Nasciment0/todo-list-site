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

function TaskCardContent({ task, menuOpen, setMenuOpen, onEdit, onDelete }) {
    const dateStatus = getDateStatus(task.dueDate)

    return (
        <>
            <div className="card-header">
                <h3>{task.title}</h3>
                {setMenuOpen ? (
                    <button
                        className="menu-trigger"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Abrir menu da tarefa"
                    >
                        ...
                    </button>
                ) : null}
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

            {setMenuOpen ? (
                <div className="card-menu">
                    {menuOpen && (
                        <div className="menu-dropdown">
                            <button onClick={onEdit}>Editar</button>

                            <button
                                className="danger"
                                onClick={onDelete}
                            >
                                Excluir
                            </button>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    )
}

export function TaskCardPreview({ task }) {
    return (
        <div className="card drag-overlay">
            <div
                className="drag-handle"
                aria-hidden="true"
            >
                :::
            </div>
            <TaskCardContent task={task} />
        </div>
    )
}

export default function TaskCard({ task, setTasks, isActiveDrag = false }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [editDueDate, setEditDueDate] = useState(task.dueDate || "")
    const [editPriority, setEditPriority] = useState(task.priority || "medium")
    const [menuOpen, setMenuOpen] = useState(false)
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
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

    const handleEdit = () => {
        setIsEditing(true)
        setMenuOpen(false)
    }

    const handleDeleteFromMenu = () => {
        handleDelete()
        setMenuOpen(false)
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
                    aria-label="Arrastar tarefa"
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
                        placeholder="Título da tarefa"
                    />

                    <div className="edit-row">
                        <input
                            className="edit-input"
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                        />

                        <select
                            className="edit-select"
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
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    onEdit={handleEdit}
                    onDelete={handleDeleteFromMenu}
                />
            )}
        </div>
    )
}
