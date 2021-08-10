import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  static loggedInUser = null;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies, or filter by search terms */

  static async getCompanies({ minEmployees = null, maxEmployees = null, name = null }) {
    const minQuery = minEmployees ? `minEmployees=${minEmployees}` : '';
    const maxQuery = maxEmployees ? `maxEmployees=${maxEmployees}` : '';
    const nameQuery = name ? `name=${name}` : '';
    let queryString = '';
    const queries = [minQuery, maxQuery, nameQuery];
    for (let query of queries) if (query) queryString += `&${query}`;
    if (queryString) queryString = `?${queryString.slice(1)}`;

    const res = await this.request(`companies${queryString}`);
    return res.companies;
  }

  /** Post a new company */

  static async postCompany(company) {
    const res = await this.request('companies', company, 'post');
    return res.company;
  }

  /** Patch a company */

  static async patchCompany(handle, newInfo) {
    const res = await this.request(`companies/${handle}`, newInfo, 'patch');
    return res.company;
  }

  /** Delete a company */

  static async deleteCompany(handle) {
    const res = await this.request(`companies/${handle}`, {}, 'delete');
    return res.deleted;
  }

  /** Get all jobs, or filter by search terms */

  static async getJobs({ minSalary = null, hasEquity = false, title = null }) {
    const salaryQuery = minSalary ? `minSalary=${minSalary}` : '';
    const equityQuery = hasEquity ? `hasEquity=true` : '';
    const titleQuery = title ? `title=${title}` : '';
    let queryString = '';
    const queries = [salaryQuery, equityQuery, titleQuery];
    for (let query of queries) if (query) queryString += `&${query}`;
    if (queryString) queryString = `?${queryString.slice(1)}`;

    const res = await this.request(`jobs${queryString}`);
    return res.jobs;
  }

  /** Get user's applications */

  static async getApplications(user) {
    const applications = [];
    for (let app of user.applications) {
      const res = await this.request(`jobs/${app}`);
      applications.push(res.job);
    }
    return applications;
  }

  /** Login */

  static async login({ username, password }) {
    try {
      const res = await this.request('auth/token', { username: username, password: password }, 'post');
      this.token = res.token;
      const userRes = await this.request(`users/${username}`);
      this.loggedInUser = userRes.user;
      return true;
    } catch {
      return false;
    }
  }

  /** Logout */

  static async logout() {
    this.token = null;
    this.loggedInUser = null;
  }

  /** Register */

  static async register(user) {
    const res = await this.request('auth/register', user, 'post');
    this.token = res.token;
    const userRes = await this.request(`users/${user.username}`);
    this.loggedInUser = userRes.user;
  }

  /** Edit user */

  static async editUser(username, newInfo) {
    if (!newInfo.password) delete newInfo.password;
    await this.request(`users/${username}`, newInfo, 'patch');
    const res = await this.request(`users/${username}`);
    this.loggedInUser = res.user;
  }

  /** Apply for a job */

  static async apply(user, job) {
    await this.request(`users/${user.username}/jobs/${job.id}`, {}, 'post');
    const res = await this.request(`users/${user.username}`);
    this.loggedInUser = res.user;
  }

  /** Withdraw an application */

  static async withdraw(user, job) {
    await this.request(`users/${user.username}/jobs/${job.id}`, {}, 'delete');
    const res = await this.request(`users/${user.username}`);
    this.loggedInUser = res.user;
  }
}

export default JoblyApi;