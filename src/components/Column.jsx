import TaskCard from "./TaskCard"
import "./Column.css"

export default function Column({ tasks, status, setTasks }) {
    const statusMap = {
        todo: "To Do",
        progress: "Em Progresso",
        done: "Concluido",
    }

    const filteredTasks = tasks.filter((task) => task.status === status)

    return (
        <div className="column">
            <div className="column-header">
                <h2>{statusMap[status] || status}</h2>
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
