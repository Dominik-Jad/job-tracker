import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Kanban/Column";
import AddJobForm from "../components/Kanban/addJobForm";

const Tracker = () => {
    const [Wishlist, setWishlist] = React.useState([]);
    const [applied, setApplied] = React.useState([]);
    const [interview, setInterview] = React.useState([]);
    const [offer, setOffer] = React.useState([]);
    const [accepted, setAccepted] = React.useState([]);
    const addJobToWishlist = (job) => {
        setWishlist((prevWishlist) => [...prevWishlist, job]);
    };
    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const job = findItemById(draggableId, [... Wishlist, ...applied, ...offer, ...interview, ...accepted]);

        setNewState(destination.droppableId, job);

    };

    function deletePreviousState(sourceDroppableId, jobId) {

        switch (sourceDroppableId) {
            case "1":
                setWishlist(removeItemById(jobId, Wishlist));
                break;
            case "2":
                setApplied(removeItemById(jobId, applied));
                break;
            case "3":
                setInterview(removeItemById(jobId, interview));
                break;
            case "4":
                setOffer(removeItemById(jobId, offer));
                break;
            case "5":
                setAccepted(removeItemById(jobId, accepted));
                break;
            default:
        }
    }

        function setNewState(destinationDroppableId, job) {
            let updatedJob;
            switch (destinationDroppableId) {
                case "1":
                    updatedJob = {
                       ...job, Wishlist:false};
                      setApplied(updatedJob, ...applied);
                      break;
                case "2":
                    updatedJob = {
                        ...job, applied:false};
                        setInterview(updatedJob, ...interview);
                        break;
                case "3":
                    updatedJob = {
                        ...job, interview:false};
                        setOffer(updatedJob, ...offer);
                        break;
                case "4":
                    updatedJob = {
                        ...job, offer:false};
                        setAccepted(updatedJob, ...accepted);
                        break;
                case "5":
                    updatedJob = {
                        ...job, accepted:false};
                        break;
                    }
                }

            

            function findItemById(id, jobs) {
                return jobs.find((job) => job.id === id);
            }

            function removeItemById(id, jobs) {
                return jobs.filter((job) => job.id!== id);
            }
            
                                

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h3>Job Application Tracker Board</h3>
            <AddJobForm onAdd={addJobToWishlist} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Column title="Wishlist" jobs={Wishlist} id="1" />
                <Column title="Applied" jobs={applied} id="2" />
                <Column title="Interview" jobs={interview} id="3" />
                <Column title="Offer" jobs={offer} id="4" />
                <Column title="Accepted" jobs={accepted} id="5" />
            </div>
        </DragDropContext>
    );
};

export default Tracker;
