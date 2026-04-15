import TaskCard from "./TaskCard"
export default function Column({ tasks, status, setTasks }) {
    const filteredTasks = tasks.filter((task) => task.status === status)
    return (
        <div>
            <h2>{status}</h2>
            {filteredTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    setTasks={setTasks}
                    task={task}
                />
            ))}
        </div>
    )
}
