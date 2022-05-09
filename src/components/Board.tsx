import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";


const Wrapper = styled.div`
    padding: 20px 0px;
    background-color: ${(props)=> props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${(props)=>(
        props.isDraggingOver ? "#7c8c92": props.isDraggingFromThis ? "b2bec3" : "transparent"
        )};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

interface IAreaProps{
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

interface IBoardProps{
    toDos: string[];
    boardId: string;
}

function Board({toDos, boardId}:IBoardProps){
        return(
            <Wrapper>
                <Title>{boardId}</Title>
                <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver}
                          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                     ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo,index) => (
                        <DraggableCard key={toDo} index={index} toDo={toDo}/>
                    ))}
                    {magic.placeholder}
                    </Area>
                )}
                </Droppable>
            </Wrapper>
            
        )
    }

    export default Board;