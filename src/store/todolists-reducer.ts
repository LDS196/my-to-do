import {FilterValuesType, TodolistType} from "../App";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "./constants";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    title: string
    id:string
}
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    title: string
    id: string
}
export type ChangeTodoListFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    filter: FilterValuesType
    id: string
}



type ActionType=RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {

    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD_TODOLIST':
            const newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }

            return [...todolists, newTodolist]
        case 'CHANGE_TODOLIST_TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const removeTodolistAC=(id:string):RemoveTodolistAT=>({type: REMOVE_TODOLIST, id})
export const addTodolistAC=(title:string):AddTodolistAT=>({type: ADD_TODOLIST,id:v1(),title})
export const changeTodolistTitleAC=(title:string,id:string):ChangeTodolistTitleAT=>({type: CHANGE_TODOLIST_TITLE, title,id})
export const changeTodoListFilterAC=(filter:FilterValuesType,id:string):ChangeTodoListFilterAT=>({type: CHANGE_TODOLIST_FILTER, filter,id})