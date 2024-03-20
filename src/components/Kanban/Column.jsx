
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Job from "./Job";
const Container = styled.div`
    background-color: lightblue;
    border-radius: 2px;
    width: 180px;
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
        background-color: #F2F2F2;
        flex-grow: 1;
        min-height: 300px;
`;
export default function Column({ title, jobs, id }) {
    return (
        <Container>
            <Title
                style={{
                    backgroundColor: "#ccc",
                    position: "sticky"
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
                      {jobs.map((job, index) => (
                            <Job key={job.id} job={job} index={index} />
                        ))}
                        {provided.placeholder}
                    </JobList>
                )}
            </Droppable>
        </Container>
    );
}