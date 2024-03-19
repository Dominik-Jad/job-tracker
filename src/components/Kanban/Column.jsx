import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Job from "./Job";

const Container = styled.div`
    background-color: #f2f2f2;
    border-radius: 2px;
    width: 200px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid #ccc;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: #ccc;
    text-align: center;
`;

const JobList = styled.div`
        padding: 3px;
        tranition: background-color 0.2s ease;
        background-color: #f2f2f2;
        flex-grow: 1;
        min-height: 100px;
`;

export default function Column({ title, jobs, id }) {
    return (
        <Container>
            <Title
                style={{
                    backgroundColor: "#ccc",
                    position: "stick"
                }}
            >
                {title}
            </Title>
            <Droppable droppableId={id}>
                {(provided) => (
                    <JobList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={provided.isDraggingOver}
                    >
                        {/* tasks go here (to do ) */}
                    </JobList>
                )}
            </Droppable>
        </Container>
    );
}



    
