import "./TopBar.css"

export default function TopBar() {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <h1>Bem-vindo de volta</h1>
                <span>Seu workspace</span>
            </div>

            <div className="topbar-right">
                <button className="avatar">G</button>
            </div>
        </header>
    )
}
