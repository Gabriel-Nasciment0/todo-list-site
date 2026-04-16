import "./FilterBar.css"

export default function FilterBar({ filter, setFilter }) {
    const filters = [
        { label: "Todas", value: "all" },
        { label: "Concluidas", value: "done" },
        { label: "Pendentes", value: "pending" },
    ]

    return (
        <div className="filter-bar">
            {filters.map((item) => (
                <button
                    key={item.value}
                    onClick={() => setFilter(item.value)}
                    className={filter === item.value ? "active" : ""}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}
