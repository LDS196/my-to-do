import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import Button from "./Button";

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
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        title,
        tasks,
        addTask,
        todolistId,
        removeTask,
        filter,
        changeFilterTodolist,
        changeStatusTask,
        removeTodolist
    } = props
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string>('')
    const errorText = 'Incorrect value'
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }
    const addNewTask = () => {
        if (inputValue.trim()) {
            addTask(inputValue.trim(), todolistId)
        } else {
            setError(errorText)
        }
        setInputValue('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTask();
    const onClickChangeFilterTodolist = (value: FilterType) => {
        changeFilterTodolist(value, todolistId)
    }

    let tasksForRender = tasks.length
        ? tasks.map(t => {
            const removeTaskHandler = () => {
                removeTask(t.id, todolistId)
            }
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatusTask(t.id, todolistId, e.currentTarget.checked)
            }
            return <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone} onChange={onChangeSetTaskStatus}/><span>{t.title}</span>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        })
        : "Todolist is empty"

    return (
        <div>
            <h3>{title}</h3>
            <Button title={'Remove Todolist'} callback={() => removeTodolist(todolistId)} filter={filter}/>
            <input onChange={onChangeHandler} value={inputValue} onKeyDown={onKeyDownHandler}/>
            <Button title={'Add Task'} callback={addNewTask} filter={filter}/>
            {error ? error : ''}
            <ul>{tasksForRender}</ul>
            <Button title={'all'} callback={() => onClickChangeFilterTodolist('all')} filter={filter}/>
            <Button title={'completed'} callback={() => onClickChangeFilterTodolist('completed')} filter={filter}/>
            <Button title={'active'} callback={() => onClickChangeFilterTodolist('active')} filter={filter}/>

        </div>
    );
};

