import { copy } from "@testing-library/user-event/dist/types/clipboard";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Bin from "./components/Bin";
import Board from "./components/Board";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
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
    grid-template-columns: repeat(4, 1fr);
`;

const Bins = styled.div`
    display: flex;
    margin-left: 50px;
    gap: 10px;
    width: 10px;
    height: 10px;
`;

interface IBoardForm{
    boardId: string;
}
function App() {
    
    const [toDos, setToDos] = useRecoilState(toDoState)
    const {register, setValue, handleSubmit} = useForm<IBoardForm>();
    // setToDos(allBoards=>{
    //     localStorage.getItem(`${boardId}`, boardId);
    //      return{

    //      }
    //  }
    // )
    const onValid = ({boardId}:IBoardForm) =>{
        
        setToDos(allBoards=>{
            return{
                
                ...allBoards,
                [boardId]:[],
            }
        })
        setValue("boardId","");
    }

    const onDragEnd = (info:DropResult) => {
        
        const { destination, draggableId, source} = info;
        
        if (!destination) return;
        
        if (destination?.droppableId === "bin"){
            
            setToDos((allBoards)=>{
                const sourceBoard = [...allBoards[source.droppableId]];
                const boardCopy = [...allBoards[source.droppableId]]
                const deletedObj = boardCopy.splice(source.index,1)
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                }
            })
        } else{
            if (destination?.droppableId === source.droppableId){
                setToDos((allBoards) =>{
                
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination.index, 0, taskObj);
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
                    const taskObj = sourceBoard[source.index];
    
                    const destinationBoard = [...allBoards[destination.droppableId]];
                    sourceBoard.splice(source.index, 1);
                    destinationBoard.splice(destination.index, 0, taskObj);
                
                return{
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
                }
                );
            }
        }

        // same board drag
        

        console.log(destination.droppableId);

    };
    return (
    <DragDropContext onDragEnd={onDragEnd}>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register("boardId", {required:true})}
                type="text"
                placeholder={`Add new Board!`}></input>
            </form>
        <Wrapper>
            <Boards>
                {Object.keys(toDos).map((boardId) => 
                (
                <Board toDos={toDos[boardId]} key={boardId} boardId={boardId}/>)
                )}
            </Boards>
                <Bin/> 
        </Wrapper>
    </DragDropContext>
  );
}
export default App;