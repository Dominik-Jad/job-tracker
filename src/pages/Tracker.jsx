import { useState, useEffect } from "react";
import '../components/app.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _, { random } from "lodash";
import { v4 } from "uuid";
import { Modal} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';


const Tracker = (props) => {
  const [state, setState] = useState({
    "wishlist": {
      title: "Wish List",
      jobs: []
    },
    "applied": {
      title: "Applied",
      jobs: []
    },
    "interview": {
      title: "Interview",
      jobs: []
    },
    "accepted": {
      title: "Accepted",
      jobs: []
    }
  });
  const [formValues, setFormValues] = useState({
    user: props.session.user.id,
    company: '',
    jobTitle: '',
    description: '',
    hours: '',
    remote: false,
    salary: '',
  });

  const getJobs = async () => {
    const { data: jobObj, error } = await props.supabase
      .from('jobs')
      .select('*')
      .eq('user', props.session.user.id);

    if (jobObj) {
      console.log(jobObj);
      assignJobs(jobObj);

    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);


  const assignJobs = (jobObj) => {
    const newState = {
      "wishlist": {
        title: "Wish List",
        jobs: []
      },
      "applied": {
        title: "Applied",
        jobs: []
      },
      "interview": {
        title: "Interview",
        jobs: []
      },
      "accepted": {
        title: "Accepted",
        jobs: []
      }
    };

    jobObj.forEach(job => {
      newState[job.status].jobs.push(job);
    });

    setState(newState);
  }

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    // Creating a copy of job before removing it from state
    const jobCopy = { ...state[source.droppableId].jobs[source.index] };

    setState(prev => {
      prev = { ...prev };
      // Remove from previous jobs array
      prev[source.droppableId].jobs.splice(source.index, 1);

      // Adding to new jobs array location
      prev[destination.droppableId].jobs.splice(destination.index, 0, jobCopy);

      // Updating job status
      jobCopy.status = destination.droppableId;

      return prev;
    });

  };

  const addJob = () => {
    const { company, jobTitle, description, hours, remote, salary } = formValues;
    const job = {
      id: random(0, 1000),
      idv4: v4(),
      company,
      jobTitle,
      description,
      hours,
      remote,
      salary,
      user: props.session.user.id,
      status: "wishlist"
    };
    //check if all fields are filled out
    if (!company || !jobTitle || !description || !hours || !salary) {
      notifyError();
      return;
    }
    setState(prevState => {
      const newState = { ...prevState };
      newState.wishlist.jobs.push(job);
      return newState;
    });
    //clear form
    setFormValues({
      company: '',
      jobTitle: '',
      description: '',
      hours: '',
      remote: false,
      salary: '',
    });

    handleClose();
    notifySuccess();
  };

  const handleDeleteJob = (categoryKey, jobIndex) => {
    setState(prevState => {
      const newState = { ...prevState };
      newState[categoryKey].jobs.splice(jobIndex, 1);
      return newState;
    });
    notifyDelete();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setFormValues({
      company: '',
      jobTitle: '',
      description: '',
      hours: '',
      remote: '',
      salary: '',
    });
  
  }

  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const submitJobs = async () => {
    // upsert jobs to database without id
    const jobs = [];
    _.map(state, (data, key) => {
      data.jobs.forEach(job => {
        jobs.push(job);
      });
    });
    console.log(jobs);


    const { data: deleteData, error: deleteError } = await props.supabase
      .from('jobs')
      .delete()
      .eq('user', props.session.user.id);

    if (deleteData) {
      console.log(deleteData);
    }
    else {
      console.log(deleteError);
    }

    const { data, error } = await props.supabase
      .from('jobs')
      .upsert(jobs);
    if (data) {
      console.log(data);
    }
    else {
      console.log(error);
    }
    notifySave();
  }

  const notifySuccess = () => toast.success(`Job Added!`);
  const notifyError = () => toast.error(`Please fill out all fields!`);
  const notifyDelete = () => toast.error(`Job Deleted!`);
  const notifySave = () => toast.success(`Jobs Saved!`);

  return (
    <div>
        <ToastContainer />
        <div className="addJob">
        <button className="buttonUsers" onClick={handleShow}>
          Add Job
        </button>
        <button className="buttonUsers" variant="primary" onClick={submitJobs}>
          Save Jobs
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Job!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="input-container">
              <input
                name="company"
                value={formValues.company}
                onChange={handleChange}
                placeholder="Company"
              />
              <input
                name="jobTitle"
                value={formValues.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
              />
              <input
                name="description"
                value={formValues.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <input
                type="number"
                name="hours"
                min="0" max="99"
                value={formValues.hours}
                onChange={handleChange}
                placeholder="Hours"
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="remote"
                  checked={formValues.remote}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="remote">Remote</label>
              </div>
              <input
                min="0" max="999999"
                type="number"
                name="salary"
                value={formValues.salary}
                onChange={handleChange}
                placeholder="Salary"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="buttonUsers" variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button className="buttonUsers" variant="primary" onClick={addJob}>
              Add job
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="App container">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column col-3"}>
                <h2>{data.title}</h2>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.jobs.map((el, index) => {
                          return (
                            <Draggable key={el.idv4} index={index} draggableId={el.idv4}>
                              {(provided, snapshot) => {
                                console.log(snapshot);
                                return (
                                  <div
                                    className={`job ${snapshot.isDragging && "dragging"}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <h3>{`Company: ${el.company}`}</h3>
                                    <p>{`Job Title: ${el.jobTitle}`}</p>
                                    <p>{`Description: ${el.description}`}</p>
                                    <p>{`Hours: ${el.hours}`}</p>
                                    <p>{`Remote: ${el.remote}`}</p>
                                    <p>{`Salary: ${el.salary}`}</p>
                                    <span className="delete-icon" onClick={() => handleDeleteJob(key, index)}>X</span>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Tracker;
