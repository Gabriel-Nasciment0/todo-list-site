import TaskForm from "./TaskForm"
import FilterMenu from "./FilterMenu"
import "./BorderHeader.css"

export default function BoardHeader({
    isMobile,
    isModalOpen,
    setIsModalOpen,
    ...props
}) {
    return (
        <>
            <div className="board-header">
                {/* Desktop */}
                {!isMobile && (
                    <div className="board-right">
                        <FilterMenu
                            filter={props.filter}
                            setFilter={props.setFilter}
                            sortType={props.sortType}
                            setSortType={props.setSortType}
                        />

                        <button
                            className="primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Adicionar tarefa
                        </button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div
                    className="modal-overlay"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Nova tarefa</h3>

                        <TaskForm
                            {...props}
                            onAdd={() => {
                                props.onAdd()
                                setIsModalOpen(false)
                            }}
                        />

                        <button
                            className="close-btn"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
