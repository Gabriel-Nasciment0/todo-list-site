import TaskCard from "./TaskCard"
import { useDroppable } from "@dnd-kit/core"
import "./Column.css"

const priorityOrder = { high: 0, medium: 1, low: 2 }

export default function Column({ tasks, status, setTasks }) {
    const statusMap = {
        todo: "To Do",
        progress: "Em Progresso",
        done: "Concluído",
    }

    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })
    const sortTasks = (a, b) => {
        const pA = priorityOrder[a.priority || "medium"]
        const pB = priorityOrder[b.priority || "medium"]

        // 1. prioridade
        if (pA !== pB) return pA - pB

        // 2. prazo
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1 // A vai pra baixo
        if (!b.dueDate) return -1 // B vai pra baixo

        return a.dueDate.localeCompare(b.dueDate)
    }
    const filteredTasks = tasks
        .filter((task) => task.status === status)
        .sort(sortTasks)

    return (
        <div
            ref={setNodeRef}
            className={`column ${status}`}
            style={{
                background: isOver ? "#e0e7ff" : "#f4f5f7",
            }}
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
                        />
                    ))
                )}
            </div>
        </div>
    )
}
