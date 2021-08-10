import { salarize, findApplication } from './helpers';
import { useState } from 'react';
import JoblyApi from './JoblyAPI';
import './JobCard.css';

const JobCard = ({ job, loggedInUser, setLoggedInUser }) => {
    const [alreadyApplied, setAlreadyApplied] = useState(findApplication(job, loggedInUser));

    function handleApply() {
        JoblyApi.apply(loggedInUser, job)
            .then(() => {
                setLoggedInUser('loggedInUser', JoblyApi.loggedInUser);
                setAlreadyApplied(true);
            });
    }

    function handleWithdraw() {
        JoblyApi.withdraw(loggedInUser, job)
            .then(() => {
                setLoggedInUser('loggedInUser', JoblyApi.loggedInUser);
                setAlreadyApplied(false);
            });
    }

    return (
        <div className="JobCard">
            <h3 className="JobCard-header">{job.title}</h3>
            <h5 className="JobCard-header">Salary: {job.salary ? `${salarize(job.salary)}` : 'Unavailable'}</h5>
            <h5 className="JobCard-header">Equity: {job.equity ? `${job.equity}%` : 'Unavailable'}</h5>
            {alreadyApplied ? (
                <div>
                    <p className="JobCard-applied">Applied!</p>
                    <button className="JobCard-button" onClick={handleWithdraw}>Withdraw application</button>
                </div>
            ) : <button className="JobCard-button" onClick={handleApply}>Apply</button>}
        </div>
    )
}

export default JobCard;