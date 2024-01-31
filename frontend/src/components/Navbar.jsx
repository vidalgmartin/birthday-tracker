import { Link } from 'react-router-dom'

export default function Navbar() {
    
    return (
        <header className="navbar">
            <div className="navbar-content">
                <div className="icon">
                    ICON
                </div>
                <div className="links">
                    <Link to="/">
                        <h3>Home</h3>
                    </Link>
                    <Link to="/tasks">
                        <h3>Task List</h3>
                    </Link>
                </div>
            </div>
        </header>
    )
}