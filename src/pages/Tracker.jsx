import React from "react";
import { useState, useEffect } from "react";

const Tracker = (props) => {

    const [jobs, setJobs] = useState([]);

 
    const getJobs = async () => {
        const { data, error } = await props.supabase
            .from('jobs')
            .select('*')
            .eq('user', props.session.user.id);

        if (data) {
            setJobs(data);
            console.log(jobs);
        } else {
            console.log(error);
        }
    }

    useEffect(() => {
       getJobs();
    }, []);

    return (
        <div>
            <h2>Tracker</h2>
            <p>Tracker page content</p>
            <p>Jobs:</p>
            <ul className="job-list">
                {jobs.map((job, index) => (
                    <li key={index}>{job.jobTitle} - {job.company} - {job.startDate} -
                    {job.hours} - {job.remote} - {job.salary} - {job.description} - {job.contact}
                    {job.benefits} - {job.location}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tracker;