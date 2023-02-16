import React, {ChangeEvent, useCallback, useState} from 'react';

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {Button, Checkbox, IconButton} from "@mui/material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskType
} from "../store/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
} from "../store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../store/store";

type TodolistPropsType = {
    id:string
    title:string
    filter: FilterValuesType
}
export const Todolist: React.FC<TodolistPropsType> = React.memo(({id,title,filter}) => {
    console.log('Todolist')
    const tasks = useSelector<RootStateType, TaskType[]>((state) => state.tasksReducer[id])
    const dispatch = useDispatch()
    const getTasksForRender = useCallback((tasks: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case 'active':
                return tasks.filter((t => !t.isDone));
            case 'completed':
                return tasks.filter((t => t.isDone));
            default:
                return tasks
        }
    },[filter])


    const addNewTask = useCallback((value: string) => {
        dispatch(addTaskAC(value, id))
    },[id])
    const onClickChangeFilterTodolist = useCallback((value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(value, id))
    },[id])
    const onClickRemoveTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    },[id])
    const onChangeTitleTodolist = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, id))
    },[id])

    let tasksForRender = tasks.length
        ? getTasksForRender(tasks,filter).map(t => {
            const removeTaskHandler = () => {
                dispatch(removeTaskAC(t.id, id))
            }
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(t.id, id, e.currentTarget.checked))
            }
            const onChangeTitle = (value: string,) => {
                dispatch(changeTaskTitleAC(value, id, t.id))

            }
            return <li className={'task'} key={t.id}>
                <Checkbox size={"small"} checked={t.isDone}
                          onChange={onChangeSetTaskStatus}/>
                <EditableSpan title={t.title} onChangeTitle={onChangeTitle}/>

                <IconButton color={"primary"} size={"small"} onClick={removeTaskHandler}>
                    <BackspaceIcon/>
                </IconButton>
            </li>
        })
        : "Todolist is empty"

    return (
        <div>
            <div className={'task title'}>
                <EditableSpan title={title} onChangeTitle={onChangeTitleTodolist}/>
                <IconButton color={"primary"} size={"small"} onClick={onClickRemoveTodolist}>
                    <BackspaceIcon/>
                </IconButton>
            </div>

            <AddItemForm addItem={addNewTask}/>

            <ul>{tasksForRender}</ul>
            <div className={"buttons"}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{mr: '4px'}}
                        onClick={() => onClickChangeFilterTodolist('all')}>all
                </Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{mr: '4px'}}
                        onClick={() => onClickChangeFilterTodolist('completed')}>completed
                </Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        size={'small'}
                        onClick={() => onClickChangeFilterTodolist('active')}>active
                </Button>
            </div>
        </div>
    );
});
