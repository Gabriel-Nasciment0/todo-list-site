import { useState, useRef, useEffect } from "react"
import "./FilterMenu.css"

export default function FilterMenu({
    filter,
    setFilter,
    sortType,
    setSortType,
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const filterOptions = [
        { label: "Todas", value: "all" },
        { label: "Pendentes", value: "pending" },
        { label: "Concluídas", value: "done" },
    ]

    const sortOptions = [
        { label: "Prioridade", value: "priority" },
        { label: "Prazo", value: "dueDate" },
        { label: "Prioridade + Prazo", value: "priority_due" },
        { label: "Criação", value: "createdAt" },
    ]

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div
            className="filter-menu-wrapper"
            ref={ref}
        >
            <button
                className="filter-menu-button"
                onClick={() => setOpen((prev) => !prev)}
            >
                Filtrar ▼
            </button>

            {open && (
                <div className="filter-menu-dropdown">
                    {/* Seção de Filtro */}
                    <div className="filter-section">
                        <span className="section-title">
                            Filtrar por status
                        </span>
                        {filterOptions.map((item) => (
                            <button
                                key={item.value}
                                className={`filter-menu-item ${
                                    filter === item.value ? "active" : ""
                                }`}
                                onClick={() => {
                                    setFilter(item.value)
                                    setOpen(false)
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <hr className="menu-separator" />

                    {/* Seção de Ordenação */}
                    <div className="sort-section">
                        <span className="section-title">Ordenar por</span>
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.value}
                                className={`filter-menu-item ${
                                    sortType === opt.value ? "active" : ""
                                }`}
                                onClick={() => {
                                    setSortType(opt.value)
                                    setOpen(false)
                                }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
