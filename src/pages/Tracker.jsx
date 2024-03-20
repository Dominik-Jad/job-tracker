import { useState } from "react";
import '../components/app.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

const job = {
  id: v4(),
  name: "Example job 1 "
}

const job2 = {
  id: v4(),
  name: "Example job 2 "
}

const Tracker = () => {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    "wishlist": {
      title: "Wish List",
      jobs: [job, job2]
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

      return prev;
    });
  };

  const addJob = () => {
    setState(prev => {
      return {
        ...prev,
        wishlist: {
          title: "Wish List",
          jobs: [
            {
              id: v4(),
              name: text
            },
            ...prev.wishlist.jobs
          ]
        }
      };
    });

    setText("");
  };

  const handleDeleteJob = (categoryKey, jobIndex) => {
    setState(prevState => {
      const newState = { ...prevState };
      newState[categoryKey].jobs.splice(jobIndex, 1);
      return newState;
    });
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
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
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot);
                              return (
                                <div
                                  className={`job ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <span>{el.name}</span>
                                  <span className="delete-icon" onClick={() => handleDeleteJob(key, index)}>x</span>
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
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addJob}>Add</button>
      </div>
    </div>
  );
};
console.log (useState)

export default Tracker;
