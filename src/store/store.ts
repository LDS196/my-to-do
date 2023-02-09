import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const reducer = combineReducers({
    todolistsReducer,
    tasksReducer})


export type RootStateType = ReturnType<typeof reducer>


 export const store= legacy_createStore(reducer)

// @ts-ignore
window.store=store