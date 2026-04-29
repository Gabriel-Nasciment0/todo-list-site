import { useState, useRef, useEffect } from "react"
import "./TopBar.css"

export default function TopBar({
    isMobile,
    setFilter,
    setSortType,
    darkMode,
    setDarkMode,
    searchQuery,
    setSearchQuery,
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef()

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
        <header className="topbar">
            <div className="topbar-left">
                <h1>Bem-vindo de volta</h1>
                <span>Seu workspace</span>
            </div>

            <div className="topbar-search">
                <input
                    type="text"
                    placeholder="Buscar tarefas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button
                        className="search-clear"
                        onClick={() => setSearchQuery("")}
                        aria-label="Limpar busca"
                    >
                        ×
                    </button>
                )}
            </div>

            <div className="topbar-right">
                <button
                    className="theme-toggle"
                    onClick={() => setDarkMode((prev) => !prev)}
                >
                    {darkMode ? "Escuro" : "Claro"}
                </button>
            </div>

            {isMobile && (
                <div
                    className="topbar-right"
                    ref={ref}
                >
                    <button
                        className="hamburger"
                        onClick={() => setOpen(!open)}
                        aria-label="Abrir menu"
                    >
                        ☰
                    </button>

                    {open && (
                        <div className="menu-dropdown">
                            <button
                                onClick={() => {
                                    setFilter("all")
                                    setOpen(false)
                                }}
                            >
                                Todas
                            </button>

                            <button
                                onClick={() => {
                                    setFilter("pending")
                                    setOpen(false)
                                }}
                            >
                                Pendentes
                            </button>

                            <button
                                onClick={() => {
                                    setFilter("done")
                                    setOpen(false)
                                }}
                            >
                                Concluídas
                            </button>

                            <hr />

                            <button
                                onClick={() => {
                                    setSortType("priority")
                                    setOpen(false)
                                }}
                            >
                                Prioridade
                            </button>

                            <button
                                onClick={() => {
                                    setSortType("dueDate")
                                    setOpen(false)
                                }}
                            >
                                Prazo
                            </button>

                            <button
                                onClick={() => {
                                    setSortType("priority_due")
                                    setOpen(false)
                                }}
                            >
                                Prioridade + Prazo
                            </button>

                            <button
                                onClick={() => {
                                    setSortType("createdAt")
                                    setOpen(false)
                                }}
                            >
                                Criação
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
