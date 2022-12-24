import React, {useState} from 'react';
import {FilterType, TaskType} from "../App";
import Button from "./Button";
import Input from "./Input";

type TodolistType = {
    tasks: Array<TaskType>
    addTask:(title:string)=>void
    changeFilter:(filter:FilterType) =>void
    deleteTask:(id:number | string)=>void
}

const Todolist: React.FC<TodolistType> = ({tasks,addTask,changeFilter,deleteTask}) => {

    let [inputValue, setValueInput] = useState<string>('')

    const onChangeHandler = (value: string) => {
        setValueInput(value)
    }
    const addNewTask = ()=>{
        if(inputValue.trim()){
            addTask(inputValue)
            setValueInput('')
        }
    }
    return (
        <div>
            <Input inputValue={inputValue} callback={onChangeHandler}
            addNewTask={addNewTask}/>
            <Button title={'add'} callback={addNewTask}/>
            <ul>
                {tasks.map(t => {
                        return <li key={t.id}>
                            <input checked={t.isDone} type={"checkbox"}/>
                            <span>{t.title}</span>
                            <button onClick={()=>deleteTask(t.id)}>Delete</button>
                        </li>
                    }
                )}
            </ul>
            <Button title={'all'} callback={()=>changeFilter('all')}/>
            <Button title={'active'} callback={()=>changeFilter('active')}/>
            <Button title={'completed'} callback={()=>changeFilter('completed')}/>


        </div>
    );
};

export default Todolist;