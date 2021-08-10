import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ filters, submitTerms, submitLocation }) => {
    const initialFormData = {};
    for (let filter of filters) initialFormData[filter.name] = filter.value;
    const [formData, setFormData] = useState(initialFormData);

    function handleChange(evt) {
        const field = evt.target.name;
        const value = evt.target.name === 'hasEquity' ? evt.target.checked : evt.target.value;
        const newFormData = { ...formData };
        newFormData[field] = value;
        setFormData(newFormData);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log(formData);
        submitTerms(formData, submitLocation);
    }

    function handleClear() {
        const clearedFormData = { ...formData };
        for (let field in clearedFormData) clearedFormData[field] = field === 'hasEquity' ? false : '';
        setFormData(clearedFormData);
        submitTerms(clearedFormData, submitLocation);
    }

    return (
        <div className="SearchForm">
            <h3 className="SearchForm-header">Filter {submitLocation} by:</h3>
            {formData ? (
                <form onSubmit={handleSubmit}>
                    {filters.map(filter => (
                        <div key={filter.name} className="SearchForm-field">
                            <label htmlFor={filter.name}>{filter.label}:</label>
                            {filter.name === 'hasEquity' ? (
                                <input className="SearchForm-input" type="checkbox" name={filter.name} checked={formData[filter.name]} onChange={handleChange} />
                            ) : (
                                    <input className="SearchForm-input" type="text" name={filter.name} value={formData[filter.name]} placeholder={filter.label} onChange={handleChange} />
                                )}
                        </div>
                    ))}
                    <button className="SearchForm-button" type="submit">Filter</button>
                    <button className="SearchForm-button" type="button" onClick={handleClear}>Clear filters</button>
                </form>
            ) : null}
        </div>
    )
}

export default SearchForm;