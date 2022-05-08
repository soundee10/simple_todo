import { copy } from "@testing-library/user-event/dist/types/clipboard";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState)
    const onDragEnd = (info:DropResult) => {
        console.log(info);
        const { destination, draggableId, source} = info;
        if (!destination) return;
        
        // same board drag
        if (destination?.droppableId === source.droppableId){
            setToDos((allBoards) =>{
            const boardCopy = [...allBoards[source.droppableId]];
            boardCopy.splice(source.index, 1);
            boardCopy.splice(destination.index, 0, draggableId);
            return {
                ...allBoards,
                [source.droppableId]: boardCopy,
            };
            });
        }
        // inter board drag
        if (destination.droppableId !== source.droppableId){
            setToDos((allBoards)=>{
                const sourceBoard = [...allBoards[source.droppableId]];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0, draggableId);
            
            return{
                ...allBoards,
                [source.droppableId]: sourceBoard,
                [destination.droppableId]: destinationBoard,
            };
            }
            );
        }



    };
    return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Boards>
                {Object.keys(toDos).map((boardId) => 
                (
                <Board toDos={toDos[boardId]} key={boardId} boardId={boardId}/>)
                )}
            </Boards>
        </Wrapper>
    </DragDropContext>
  );
}
export default App;