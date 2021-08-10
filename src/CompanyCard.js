import { Link } from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({ company, detailsLink }) => {
    const logoPlaceholder = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstudyinkenya.co.ke%2Fassets%2Fdefault%2Fimages%2Fads%2Finstitution-logo-placeholder.png&f=1&nofb=1';
    const logoUnavailable = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finternationallamps.co.uk%2Fsite%2Fwp-content%2Fuploads%2F2017%2F09%2FIMAGE-UNAVAILABLE-4-1.jpg&f=1&nofb=1';

    return (
        <div className="CompanyCard">
            {company.logoUrl ? (
                <img src={logoPlaceholder} className="CompanyCard-logo" alt={`${company.handle}-logo`} />
            ) : (
                    <img src={logoUnavailable} className="CompanyCard-logo" alt={`${company.handle}-logo`} />
                )}
            <div className="CompanyCard-info">
                <h3 className="CompanyCard-header">{company.name}</h3>
                <h5 className="CompanyCard-header">{company.numEmployees} employees</h5>
                <p className="CompanyCard-description">{company.description}</p>
            </div>
            {detailsLink ? <Link className="CompanyCard-link" to={`/companies/${company.handle}`}>Company details</Link> : null}
        </div>
    )
}

export default CompanyCard;