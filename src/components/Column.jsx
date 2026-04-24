import TaskCard from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"
import "./Column.css"

const priorityOrder = { high: 0, medium: 1, low: 2 }

export default function Column({
    tasks,
    status,
    setTasks,
    sortType,
    activeTaskId,
}) {
    const statusMap = {
        todo: "To Do",
        progress: "Em Progresso",
        done: "Concluído",
    }

    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    const compareDueDate = (a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
    }

    const sortTasks = (a, b) => {
        if (sortType === "priority") {
            const pA = priorityOrder[a.priority || "medium"]
            const pB = priorityOrder[b.priority || "medium"]
            return pA - pB
        }

        if (sortType === "dueDate") {
            return compareDueDate(a, b)
        }

        if (sortType === "priority_due") {
            const pA = priorityOrder[a.priority || "medium"]
            const pB = priorityOrder[b.priority || "medium"]

            if (pA !== pB) return pA - pB

            return compareDueDate(a, b)
        }

        if (sortType === "createdAt") {
            return a.createdAt.localeCompare(b.createdAt)
        }

        return 0
    }

    const filteredTasks = tasks
        .filter((task) => task.status === status)
        .sort(sortTasks)

    return (
        <div
            ref={setNodeRef}
            className={`column ${status} ${isOver ? "is-over" : ""}`}
        >
            <div className="column-header">
                <h2>{statusMap[status]}</h2>
                <span>{filteredTasks.length}</span>
            </div>

            <div className="column-content">
                {filteredTasks.length === 0 ? (
                    <p className="empty">Nenhuma tarefa</p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            setTasks={setTasks}
                            isActiveDrag={task.id === activeTaskId}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
