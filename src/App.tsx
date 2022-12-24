import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import Todolist from "./Components/Todolist";

export type TaskType = {
    id: number | string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'completed' | 'active';

function App() {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: true},
    ]);

    const addTasks = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
const deleteTask = (id:number | string)=>{
        setTasks(tasks.filter(t=> t.id !== id))
}
    let [filter, setFilter] = useState<FilterType>('all')
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    const filterTask = ()=>{
        switch (filter){
            case 'completed':
                return tasks.filter(t=> t.isDone)
            case 'active':
                return tasks.filter(t=> !t.isDone)
            default:
                return tasks
        }
    }
        return (
            <div className="App">
                <Todolist tasks={filterTask()}
                          addTask={addTasks}
                          changeFilter={changeFilter}
                          deleteTask={deleteTask}/>
            </div>
        );
}

export default App;
