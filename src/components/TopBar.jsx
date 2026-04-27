import { useState, useRef, useEffect } from "react"
import "./TopBar.css"

export default function TopBar({ isMobile, setFilter, setSortType }) {
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

            {isMobile && (
                <div
                    className="topbar-right"
                    ref={ref}
                >
                    <button
                        className="hamburger"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>

                    {open && (
                        <div className="menu-dropdown">
                            <button>🌙 Mudar tema</button>

                            <button
                                onClick={() => {
                                    setFilter("all")
                                    setOpen(false)
                                }}
                            >
                                Todas
                            </button>
                            <button onClick={() => setFilter("pending")}>
                                Pendentes
                            </button>
                            <button onClick={() => setFilter("done")}>
                                Concluídas
                            </button>

                            <hr />

                            <button onClick={() => setSortType("priority")}>
                                Prioridade
                            </button>
                            <button onClick={() => setSortType("dueDate")}>
                                Prazo
                            </button>
                            <button onClick={() => setSortType("priority_due")}>
                                Prioridade + Prazo
                            </button>
                            <button onClick={() => setSortType("createdAt")}>
                                Criação
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
