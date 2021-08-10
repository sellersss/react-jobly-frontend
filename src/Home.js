import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ loggedInUser }) => {
    return (
        <div className="Home">
            <h2 className="Home-header">Welcome to Jobly!</h2>
            <h4>All the jobs in one convenient place</h4>
            {loggedInUser ? (
                <div>
                    <Link className="Home-link Home-link-loggedIn" to="/companies">Companies</Link>
                    <Link className="Home-link Home-link-loggedIn" to="/jobs">Jobs</Link>
                    <Link className="Home-link Home-link-loggedIn" to="/profile">My Profile</Link>
                </div>
            ) : (
                    <div>
                        <Link className="Home-link Home-link-loggedOut" to="/login">Login</Link>
                        <Link className="Home-link Home-link-loggedOut" to="/signup">Sign Up</Link>
                    </div>
                )}
        </div>
    )
}

export default Home;