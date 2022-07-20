import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";


interface IAreaProps{
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}


const Area = styled.div<IAreaProps>`
    background-color: ${(props)=>(
        props.isDraggingOver ? "#7c8c92": props.isDraggingFromThis ? "b2bec3" : "transparent"
        )};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 10px;
    
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
`;

function Bin(){

return (
    <Droppable droppableId="bin">
                {(provided, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver}
                          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                     ref={provided.innerRef} {...provided.droppableProps}
                     >
                        To delete
                     <Img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" />
                    
                    </Area>
                )}
        </Droppable>
);
}



export default React.memo(Bin);
