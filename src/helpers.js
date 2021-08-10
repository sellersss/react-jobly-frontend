const salarize = (salary) => {
    let salaryString = salary.toString();
    let outputString = '';
    while (salaryString.length > 3) {
        outputString = `,${salaryString.slice(-3)}${outputString}`;
        salaryString = salaryString.slice(0, -3);
    }
    outputString = `$${salaryString}${outputString}`;
    return outputString;
}

const findApplication = (job, user) => {
    for (let application of user.applications) if (job.id === application) return true;
    return false;
}

export { salarize, findApplication };