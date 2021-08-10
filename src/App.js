import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import CompanyList from './CompanyList';
import CompanyDetails from './CompanyDetails';
import JobList from './JobList';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';
import EditProfile from './EditProfile';
import './App.css';
import { useEffect, useState } from 'react';
import useLocalStorage from './hooks';
import JoblyApi from './JoblyAPI';
import Unauthorized from './Unauthorized';

function App() {
  const [companies, setCompanies] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [companyFormData, setCompanyFormData] = useState(true);
  const [jobFormData, setJobFormData] = useState(true);
  const [companyFilters, setCompanyFilters] = useState([
    { name: 'minEmployees', label: 'Min employees', value: '' },
    { name: 'maxEmployees', label: 'Max employees', value: '' },
    { name: 'name', label: 'Company name', value: '' }
  ]);
  const [jobFilters, setJobFilters] = useState([
    { name: 'minSalary', label: 'Min salary', value: '' },
    { name: 'hasEquity', label: 'Has equity', value: false },
    { name: 'title', label: 'Title', value: '' }
  ]);
  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser');
  const [token, setToken] = useLocalStorage('token');
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(function () {
    JoblyApi.getCompanies(companyFormData).then(res => setCompanies(res));
    JoblyApi.getJobs(jobFormData).then(res => setJobs(res));
  }, [companyFormData, jobFormData]);

  useEffect(function () {
    const currentToken = JSON.parse(localStorage.getItem('token'));
    if (currentToken) JoblyApi.token = currentToken;
  }, []);

  useEffect(function () {
    if (updateUser) setLoggedInUser('loggedInUser', JoblyApi.loggedInUser);
    else setUpdateUser(true);
  }, [token]);

  function submit(filterData, list) {
    if (list === 'companies') {
      const newFilters = [...companyFilters];
      for (let filter of newFilters) filter.value = filterData[filter.name];
      setCompanyFilters(newFilters);
      setCompanyFormData(filterData);
    } else if (list === 'jobs') {
      const newFilters = [...jobFilters];
      for (let filter of newFilters) filter.value = filterData[filter.name];
      setJobFilters(newFilters);
      setJobFormData(filterData);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggedInUser={loggedInUser} setToken={setToken} />
        <Switch>
          <Route exact path="/companies">
            {companies ? <CompanyList companies={companies} filters={companyFilters} loggedInUser={loggedInUser} submitFilters={submit} /> : null}
          </Route>
          <Route exact path="/companies/:handle">
            <CompanyDetails loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </Route>
          <Route exact path="/jobs">
            {jobs ? <JobList jobs={jobs} filters={jobFilters} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} submitFilters={submit} /> : null}
          </Route>
          <Route exact path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route exact path="/signup">
            <Signup setToken={setToken} />
          </Route>
          <Route exact path="/profile">
            <Profile user={loggedInUser} />
          </Route>
          <Route exact path="/profile/edit">
            <EditProfile user={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </Route>
          <Route exact path="/">
            <Home loggedInUser={loggedInUser} />
          </Route>
          <Route exact path="/unauthorized">
            <Unauthorized />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
