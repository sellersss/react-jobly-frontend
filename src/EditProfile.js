import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyAPI';
import './EditProfile.css';

const EditProfile = ({ user, setLoggedInUser }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        password: '',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });

    function handleChange(evt) {
        const field = evt.target.name;
        const value = evt.target.value;
        const newFormData = { ...formData };
        newFormData[field] = value;
        setFormData(newFormData);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        JoblyApi.editUser(user.username, formData).then(() => {
            setLoggedInUser('loggedInUser', JoblyApi.loggedInUser);
            history.push('/');
        });
    }

    return (
        <div className="EditProfile">
            <h2 className="EditProfile-header">Edit {user.username}</h2>
            <form onSubmit={handleSubmit}>
                <div className="EditProfile-field">
                    <label htmlFor="password">Password:</label>
                    <input className="EditProfile-input" type="password" id="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
                </div>
                <div className="EditProfile-field">
                    <label htmlFor="firstName">First name:</label>
                    <input className="EditProfile-input" type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="First name" onChange={handleChange} />
                </div>
                <div className="EditProfile-field">
                    <label htmlFor="lastName">Last name:</label>
                    <input className="EditProfile-input" type="text" id="lastName" name="lastName" value={formData.lastName} placeholder="Last name" onChange={handleChange} />
                </div>
                <div className="EditProfile-field">
                    <label htmlFor="email">Email:</label>
                    <input className="EditProfile-input" type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} />
                </div>
                <button className="EditProfile-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditProfile;