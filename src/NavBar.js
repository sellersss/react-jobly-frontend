import { NavLink } from 'react-router-dom';
import JoblyApi from './JoblyAPI';
import './NavBar.css';

const NavBar = ({ loggedInUser, setToken }) => {
    function logout() {
        JoblyApi.logout();
        setToken('token', null);
    }

    return (
        <ul className="NavBar">
            <li className="NavLink-left"><NavLink to="/">Jobly</NavLink></li>
            {loggedInUser ? (
                <li className="NavLink-right" onClick={logout}><NavLink to="/logout">Logout</NavLink></li>
            ) : (
                    <li className="NavLink-right"><NavLink to="/signup">Sign Up</NavLink></li >
                )
            }
            {loggedInUser ? (
                <li className="NavLink-right"><NavLink to="/profile"><i className="fa fa-user" style={{ fontSize: '20px' }} /> {loggedInUser.username}</NavLink></li>
            ) : (
                    <li className="NavLink-right"><NavLink to="/login">Login</NavLink></li>
                )}
            {loggedInUser ? <li className="NavLink-right"><NavLink to="/jobs">Jobs</NavLink></li> : null}
            {loggedInUser ? <li className="NavLink-right"><NavLink to="/companies">Companies</NavLink></li> : null}
        </ul >
    )
}

export default NavBar;