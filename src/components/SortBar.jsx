import { useState, useRef, useEffect } from "react"
import "./SortBar.css"

export default function SortBar({ sortType, setSortType }) {
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const options = [
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
            className="sort-dropdown"
            ref={ref}
        >
            <button
                className="sort-button"
                onClick={() => setOpen(!open)}
            >
                {options.find((o) => o.value === sortType)?.label || "Sort"} ▼
            </button>

            {open && (
                <div className="sort-menu">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            className={`sort-item ${sortType === opt.value ? "active" : ""}`}
                            onClick={() => {
                                setSortType(opt.value)
                                setOpen(false)
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
