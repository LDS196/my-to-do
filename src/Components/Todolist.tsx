import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (value: string, todolistId: string) => void
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilterType
    changeFilterTodolist: (value: FilterType, todolistId: string) => void
    changeStatusTask: (taskId: string, todolistId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    onChangeTitleTask:(value: string, todolistId: string, taskId:string) => void
    onChangeSetTitleTodolist:(title:string, todolistId: string)=> void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        title, tasks, addTask, todolistId, removeTask, filter,
        changeFilterTodolist, changeStatusTask, removeTodolist,onChangeTitleTask,
        onChangeSetTitleTodolist
    } = props
    const addNewTask = (value: string) => {
        addTask(value, todolistId)
    }
    const onClickChangeFilterTodolist = (value: FilterType) => {
        changeFilterTodolist(value, todolistId)
    }
    const onClickRemoveTodolist = () => {
        removeTodolist(todolistId)
    }
    const onChangeTitleTodolist=(title:string)=>{
        onChangeSetTitleTodolist(title,todolistId)
    }

    let tasksForRender = tasks.length
        ? tasks.map(t => {
            const removeTaskHandler = () => {
                removeTask(t.id, todolistId)
            }
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatusTask(t.id, todolistId, e.currentTarget.checked)
            }
            const onChangeTitle=(value: string,)=>{
                onChangeTitleTask(value, todolistId, t.id)
            }
            return <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone}
                       onChange={onChangeSetTaskStatus}/>
                <EditableSpan title={t.title} onChangeTitle={onChangeTitle}/>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        })
        : "Todolist is empty"

    return (
        <div>
            <h3><EditableSpan title={title} onChangeTitle={onChangeTitleTodolist}/></h3>
            <AddItemForm addItem={addNewTask}/>

            <button onClick={onClickRemoveTodolist}>Remove Todolist</button>
            <ul>{tasksForRender}</ul>
            <button className={filter === 'all' ? 'active' : undefined}
                    onClick={() => onClickChangeFilterTodolist('all')}>all
            </button>
            <button className={filter === 'completed' ? 'active' : undefined}
                    onClick={() => onClickChangeFilterTodolist('completed')}>completed
            </button>
            <button className={filter === 'active' ? 'active' : undefined}
                    onClick={() => onClickChangeFilterTodolist('active')}>active
            </button>

        </div>
    );
};
