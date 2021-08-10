import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import { Redirect } from 'react-router-dom';
import './CompanyList.css';

const CompanyList = ({ companies, filters, loggedInUser, submitFilters }) => {
    if (loggedInUser) {
        return (
            <div className="CompanyList">
                <SearchForm filters={filters} submitTerms={submitFilters} submitLocation="companies" />
                <div className="CompanyList-list">
                    <h2>Companies</h2>
                    {companies.map(company => <CompanyCard key={company.handle} company={company} detailsLink={true} />)}
                </div>
            </div>
        )
    } else return <Redirect to="/unauthorized" />
}

export default CompanyList;