import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React, { useEffect } from "react";


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
    width: 100%;
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IAreaProps{
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

interface IBoardProps{
    toDos: ITodo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board({toDos, boardId}:IBoardProps){
        const setToDos = useSetRecoilState(toDoState)
        const {register, setValue, handleSubmit} = useForm<IForm>();
        useEffect(()=>
        {if(localStorage.getItem(`${boardId}`)){
            let loadToDo = JSON.parse(localStorage.getItem(`${boardId}`)+"");
            //localStorage.removeItem(`${boardId}`);
            loadToDo.forEach((obj:ITodo)=>{
                setToDos(allBoards=>{
                    return{
                        ...allBoards,
                        [boardId]:[...allBoards[boardId], obj,]
                    }
                })
            });
        } else{
        }}
        ,[])

        const onValid = ({toDo}:IForm) =>{
            const newToDo = {
                id: Date.now(),
                text: toDo,
            };
            setToDos(allBoards=>{
                localStorage.setItem(`${boardId}`, JSON.stringify([...allBoards[boardId], newToDo]));
                return{
                    ...allBoards,
                    [boardId]:[...allBoards[boardId], newToDo,]
                }
            })
            setValue("toDo", "");
        }
        return(
            <Wrapper>
                <Title>{boardId}</Title>
                <Form onSubmit={handleSubmit(onValid)}>
                    <input {...register("toDo", {required:true})} 
                    type="text" 
                    placeholder={`Add task on ${boardId}`}/>
                </Form>
                <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver}
                          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                     ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo,index) => (
                        <DraggableCard 
                        key={toDo.id} 
                        index={index} 
                        toDoId={toDo.id} toDoText={toDo.text}/>
                    ))}
                    {magic.placeholder}
                    </Area>
                )}
                </Droppable>
            </Wrapper>
            
        );
    }

export default React.memo(Board);