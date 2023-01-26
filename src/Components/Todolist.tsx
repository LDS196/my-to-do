import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {Button, Checkbox, Grid, IconButton} from "@mui/material";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (value: string, todolistId: string) => void
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilterValuesType
    changeFilterTodolist: (value: FilterValuesType, todolistId: string) => void
    changeStatusTask: (taskId: string, todolistId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    onChangeTitleTask: (value: string, todolistId: string, taskId: string) => void
    onChangeSetTitleTodolist: (title: string, todolistId: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        title, tasks, addTask, todolistId, removeTask, filter,
        changeFilterTodolist, changeStatusTask, removeTodolist, onChangeTitleTask,
        onChangeSetTitleTodolist
    } = props
    const addNewTask = (value: string) => {
        addTask(value, todolistId)
    }
    const onClickChangeFilterTodolist = (value: FilterValuesType) => {
        changeFilterTodolist(value, todolistId)
    }
    const onClickRemoveTodolist = () => {
        removeTodolist(todolistId)
    }
    const onChangeTitleTodolist = (title: string) => {
        onChangeSetTitleTodolist(title, todolistId)
    }

    let tasksForRender = tasks.length
        ? tasks.map(t => {
            const removeTaskHandler = () => {
                removeTask(t.id, todolistId)
            }
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatusTask(t.id, todolistId, e.currentTarget.checked)
            }
            const onChangeTitle = (value: string,) => {
                onChangeTitleTask(value, todolistId, t.id)
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
};
