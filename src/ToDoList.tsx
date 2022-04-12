import React, { useState } from "react";
import { useForm } from "react-hook-form";


/* function ToDoList() {
    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) =>{
        const {currentTarget: {value}}=event;
        setToDoError("");
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if (toDo.length<10){
            return setToDoError("to do should be longer");
        }
        console.log("submit");
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={toDo} placeholder="Write a to do "/>
            <button>Add</button>
            {toDoError !== "" ? toDoError: null}
        </form>
    </div>;
}
 */

interface IForm {
    toDo: string;
    email: string;
}

function ToDoList(){
    const { register, handleSubmit, formState:{errors}} = useForm<IForm>({
        defaultValues:{
        email:"@naver.com"
    }
    });
    const onValid = (data: any) =>{
        console.log(data);
    }
    console.log(errors);
    return (<div>
        <form style={{ display:"flex", flexDirection:"column"}}
        onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required: "todo required", minLength: 5})} placeholder="Write a to do" />
            <span>{errors?.toDo?.message}</span>
            <input {...register("email", {required: "email required", minLength: 5})} placeholder="please put your email" />
            <span>{errors?.email?.message}</span>
            
            <button>Add</button>
        </form>
    </div>
    )
}
export default ToDoList;

