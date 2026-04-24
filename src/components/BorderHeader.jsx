import { useState } from "react"
import TaskForm from "./TaskForm"
import FilterBar from "./FilterBar"
import "./BorderHeader.css"
import SortBar from "./SortBar"

export default function BoardHeader(props) {
    const [open, setOpen] = useState(false)

    return (
        <div className="board-header">
            <div className="board-left">
                <button type="button">Mudar tema</button>
            </div>

            <div className="board-right">
                <FilterBar {...props} />

                <SortBar
                    sortType={props.sortType}
                    setSortType={props.setSortType}
                />

                <button
                    className="primary"
                    onClick={() => setOpen(true)}
                >
                    + Adicionar tarefa
                </button>
            </div>

            {open && (
                <div
                    className="modal-overlay"
                    onClick={() => setOpen(false)}
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
                                setOpen(false)
                            }}
                        />

                        <button
                            className="close-btn"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
