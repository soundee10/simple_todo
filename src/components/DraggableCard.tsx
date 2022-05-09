import React from "react";
import{ Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

const Card = styled.div<ICardProps>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props)=> props.isDragging ? "#7cc0d8" : props.theme.cardColor};
    box-shadow: ${(props)=> props.isDragging ? "0px 2px 3px" : "none"};
`;

interface ICardProps{
    isDragging: boolean;
}

interface IDragabbleCardProps{
    toDo: string;
    index: number;
}

function DraggableCard({toDo, index}:IDragabbleCardProps){
    
    return(
        <Draggable key={toDo} draggableId={toDo} index={index}>
                        {(magic,snapshot) => (
                        <Card
                        isDragging={snapshot.isDragging}
                        ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                            {toDo}
                        </Card>
                        )}
                    </Draggable>);
}

export default React.memo(DraggableCard);
