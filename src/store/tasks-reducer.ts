
import {
    ADD_TASK,
    CHANGE_TASK_STATUS, CHANGE_TASK_TITLE,
    REMOVE_TASK,
} from "./constants";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todolist_1, todolist_2} from "./todolists-reducer";

export type RemoveTaskAT = {
    type: typeof REMOVE_TASK
    taskId: string
    todolistId: string
}
export type AddTaskAT = {
    type: typeof ADD_TASK
    title: string
    todolistId: string
}
export type OnChangeTitleTaskAT = {
    type: typeof CHANGE_TASK_TITLE
    title: string
    todolistId: string
    taskId: string
}
export type ChangeStatusTaskAT = {
    type: typeof CHANGE_TASK_STATUS
    taskId: string
    todolistId: string
    isDone: boolean
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [todolistId: string]: TaskType[]
}
const defaultTasks:TasksStateType= {
        [todolist_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todolist_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }

type ActionType= RemoveTaskAT | AddTaskAT| OnChangeTitleTaskAT | ChangeStatusTaskAT|RemoveTodolistAT|AddTodolistAT

export const tasksReducer = (tasks: TasksStateType=defaultTasks, action: ActionType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE_TASK':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD_TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...tasks, [action.todolistId]: [newTask, ...tasks[action.todolistId]]}
        case 'CHANGE_TASK_TITLE':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(el => el.id === action.taskId ? {...el, title: action.title} : el)}
        case 'CHANGE_TASK_STATUS':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}
        case 'REMOVE_TODOLIST':
            const copyTasks = {...tasks}
            delete copyTasks[action.id]
            return copyTasks
        case 'ADD_TODOLIST':
            return {...tasks, [action.id]: []}
        default:
            return tasks
    }
}

export const removeTaskAC=(taskId: string, todolistId: string):RemoveTaskAT=>({type:REMOVE_TASK, taskId, todolistId})
export const addTaskAC=(title: string, todolistId: string):AddTaskAT=>({type:ADD_TASK, title, todolistId,})
export const changeTaskTitleAC=(title: string, todolistId: string, taskId: string):OnChangeTitleTaskAT=>({type:  CHANGE_TASK_TITLE, title, todolistId, taskId})
export const changeTaskStatusAC=(taskId: string, todolistId: string,isDone: boolean):ChangeStatusTaskAT=>({type:  CHANGE_TASK_STATUS, taskId, todolistId, isDone})
// export const removeTodolistAC=(id:string):RemoveTodolistAT=>({type: REMOVE_TODOLIST, id})
// export const addTodolistAC=(title:string,id:string):AddTodolistAT=>({type: ADD_TODOLIST, title,id,})
