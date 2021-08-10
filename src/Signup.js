import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyAPI';
import './Signup.css';

const Signup = ({ setToken }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
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
        JoblyApi.register(formData).then(() => {
            setToken('token', JoblyApi.token);
            history.push('/');
        });
    }

    return (
        <div className="Signup">
            <h2 className="Signup-header">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="Signup-field">
                    <label htmlFor="username">Username:</label>
                    <input className="Signup-input" type="text" id="username" name="username" value={formData.username} placeholder="Username" onChange={handleChange} required />
                </div>
                <div className="Signup-field">
                    <label htmlFor="password">Password:</label>
                    <input className="Signup-input" type="password" id="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required />
                </div>
                <div className="Signup-field">
                    <label htmlFor="firstName">First name:</label>
                    <input className="Signup-input" type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="First name" onChange={handleChange} required />
                </div>
                <div className="Signup-field">
                    <label htmlFor="lastName">Last name:</label>
                    <input className="Signup-input" type="text" id="lastName" name="lastName" value={formData.lastName} placeholder="Last name" onChange={handleChange} required />
                </div>
                <div className="Signup-field">
                    <label htmlFor="email">Email:</label>
                    <input className="Signup-input" type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
                </div>
                <button className="Signup-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;