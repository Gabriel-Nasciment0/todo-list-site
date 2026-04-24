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
            <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    placeholder="Nova tarefa"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="dueDate">Prazo</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="priority">Prioridade</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={!newTask.trim()}
            >
                Adicionar
            </button>
        </form>
    )
}
