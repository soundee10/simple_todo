import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
    toDo: string;
}

interface IToDo {
    id: number;
    text: string;
    category: "TO_DO"|"ON_GOING"|"DONE";
}

const toDoState = atom<IToDo[]>({
    key:"toDo",
    default: [],
});


function ToDoList(){
    
    const [toDos, setToDos] = useRecoilState(toDoState);
    // const value = useRecoilValue(toDoState);
    // const modFn = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}: IForm) =>{
        setToDos((oldToDos) => [{text: toDo, category:"TO_DO", id:Date.now()}, ...oldToDos])
        setValue("toDo", "");
    };
    
    return (<div>
        <h1>To Dos</h1>
        <hr />
        <form
        onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {required: "todo required", minLength: 5})} placeholder="Write a to do" />
            <button>Add</button>
        </form>
        <ul>
            {
                toDos.map((toDo)=>(
                    <li key={toDo.id}>
                        {toDo.text}
                    </li>
                ))
            }
        </ul>
    </div>
    )
}
export default ToDoList;

