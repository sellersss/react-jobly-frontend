import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from './JoblyAPI';
import './Profile.css';

const Profile = ({ user }) => {
    const [applications, setApplications] = useState([]);

    useEffect(function () {
        JoblyApi.getApplications(user).then(res => setApplications(res));
    }, []);

    return (
        <div className="Profile">
            <h2 className="Profile-header Profile-header-top">{user.username}</h2>
            <h3 className="Profile-header">{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <h3>Applications:</h3>
            {applications.length ? (
                <div>
                    {applications.map(job => <p className="Profile-application" key={job.id}>{job.title}<Link className="Profile-link Profile-link-company" to={`/companies/${job.company.handle}`}>{job.company.name}</Link></p>)}
                </div>
            ) : <h5>None</h5>}
            <Link className="Profile-link" to="/profile/edit">Edit profile</Link>
        </div>
    )
}

export default Profile;