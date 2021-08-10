import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import JoblyApi from './JoblyAPI';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';
import './CompanyDetails.css';

const CompanyDetails = ({ loggedInUser, setLoggedInUser }) => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(function () {
        JoblyApi.getCompany(handle)
            .then(res => setCompany(res));
    }, [handle]);

    if (loggedInUser) {
        return (
            <div className="CompanyDetails">
                {company ? <CompanyCard company={company} detailsLink={false} /> : null}
                <div className="CompanyDetails-jobs">
                    <h2>Jobs</h2>
                    {company ? (
                        <div>
                            {company.jobs.map(job => <JobCard key={job.id} job={job} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />)}
                        </div>
                    ) : null}
                </div>
            </div>
        )
    } else return <Redirect to="/unauthorized" />
}

export default CompanyDetails;