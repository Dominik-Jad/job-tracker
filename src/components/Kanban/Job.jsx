
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid"
const Container = styled.div`
    border-radius: 10px;
    padding: 8px;
    color: black;
    margin-bottom: 8px;
    min-height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${props => props.isDragging ? '#B3B3B3' : '#F2F2F2'};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    cursor: pointer;
`;
const TextContent = styled.div`
    display: flex;
`;
const job = {
    id: v4(),
    name: "Clean the house"
  }
  
  const job2 = {
    id: v4(),
    name: "Wash the car"
  }
export default function Job({ job, index }) {
    return (
        <Draggable draggableId={`${job.id}`} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div style={{ display: "flex", justifyContent: "start", padding: "2" }}>
                        <span>
                            <small>#{job.id}
                                   {" "}
                             </small>
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "2"
                        }}
                    >
                        <TextContent>{job.title}</TextContent>
                    </div>
                    {job.company}
                    {job.location && (
                        <div>
                            <small>{job.location}</small>
                        </div>
                    )}
                </Container>
            )}
        </Draggable>
    );
}





