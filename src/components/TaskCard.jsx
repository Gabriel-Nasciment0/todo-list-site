export default function TaskCard({ task, setTasks }) {
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

    return (
        <div>
            <h1>{task.title}</h1>
            <button onClick={handleMoveBack}>Voltar</button>
            <button onClick={handleMoveForward}>Avançar</button>
            <button onClick={handleDelete}>Deletar</button>
        </div>
    )
}
