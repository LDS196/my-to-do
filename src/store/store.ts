import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const reducer = combineReducers({
    todolistsReducer,
    tasksReducer})


export type RootStateType = ReturnType<typeof reducer>


 export const store= createStore(reducer)

// @ts-ignore
window.store=store