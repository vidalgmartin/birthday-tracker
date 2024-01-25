import { Link } from 'react-router-dom'

export default function Navbar() {
    
    return (
        <header className="navbar">
            <div className="icon">
                ICON
            </div>
            <div className="links">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <Link to="/birthdays">
                    <h2>Birthday List</h2>
                </Link>
            </div>
        </header>
    )
}