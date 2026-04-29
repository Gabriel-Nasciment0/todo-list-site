import { useState } from "react"
import FilterMenu from "./FilterMenu"
import "./TopBar.css"

export default function TopBar({
    isMobile,
    filter,
    setFilter,
    sortType,
    setSortType,
    darkMode,
    setDarkMode,
    searchQuery,
    setSearchQuery,
}) {
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
                <div className="topbar-right">
                    <FilterMenu
                        filter={filter}
                        setFilter={setFilter}
                        sortType={sortType}
                        setSortType={setSortType}
                    />
                </div>
            )}
        </header>
    )
}
