import "./TaskForm.css"
export default function TaskForm({
    newTask,
    setNewTask,
    dueDate,
    setDueDate,
    onAdd,
}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nova Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <button
                type="submit"
                disabled={!newTask.trim()}
            >
                Adicionar
            </button>
        </form>
    )
}
