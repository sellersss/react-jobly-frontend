import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
    return (
        <div className="Unauthorized">
            <h2 className="Unauthorized-header">Unauthorized</h2>
            <p>You must be logged in to view that page!</p>
            <Link className="Unauthorized-link" to="/login">Login</Link>
            <Link className="Unauthorized-link" to="/signup">Sign up</Link>
            <Link className="Unauthorized-link" to="/">Home</Link>
        </div>
    )
}

export default Unauthorized;