import { atom, selector } from "recoil";

interface iToDoState{
    [key: string]: string[];

}

export const toDoState = atom<iToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a","b","c","d",],
        Doing: ["e","f"],
        Done: ["g"],
    }
});