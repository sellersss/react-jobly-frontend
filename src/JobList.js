import SearchForm from './SearchForm';
import JobCard from './JobCard';
import { Redirect } from 'react-router-dom';
import './JobList.css';

const JobList = ({ jobs, filters, loggedInUser, setLoggedInUser, submitFilters }) => {
    if (loggedInUser) {
        return (
            <div className="JobList">
                <SearchForm filters={filters} submitTerms={submitFilters} submitLocation="jobs" />
                <div className="JobList-list">
                    <h2>Jobs</h2>
                    {jobs.map(job => <JobCard key={job.id} job={job} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />)}
                </div>
            </div>
        )
    } else return <Redirect to="/unauthorized" />;
}

export default JobList;