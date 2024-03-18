import React from "react";
import {DragDropContext} from'react-beautiful-dnd';

const Tracker = () => {
    const [Wishlist, setWishlist] = React.useState([]);
    const [applied, setApplied] = React.useState([]);
    const [interview, setInterview] = React.useState([]);
    const [offer, setOffer] = React.useState([]);
    const [accepted, setAccepted] = React.useState([]);



    return (
        <DragDropContext>
            <h3>Job Application Tracker Board</h3>
        </DragDropContext>
    );
}


export default Tracker;