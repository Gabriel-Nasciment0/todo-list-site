import "./TaskForm.css"

export default function TaskForm({
    newTask,
    setNewTask,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    onAdd,
}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="task-form"
        >
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

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
            </select>

            <button
                type="submit"
                disabled={!newTask.trim()}
            >
                Adicionar
            </button>
        </form>
    )
}
