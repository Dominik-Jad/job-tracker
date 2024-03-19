import React from "react";
import {DragDropContext} from'react-beautiful-dnd';
import Column from "../components/Kanban/Column";

const Tracker = () => {
    const [Wishlist, setWishlist] = React.useState([]);
    const [applied, setApplied] = React.useState([]);
    const [interview, setInterview] = React.useState([]);
    const [offer, setOffer] = React.useState([]);
    const [accepted, setAccepted] = React.useState([]);



    return (
        <DragDropContext>
            <h3>Job Application Tracker Board</h3>
            <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
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
}


export default Tracker;