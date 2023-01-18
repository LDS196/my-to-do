import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksStateType = {
    [todolist: string]: TaskType[]
}
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'completed' | 'active';

function App() {
    const todolist_1: string = v1()
    const todolist_2: string = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist_1, title: 'What to learn', filter: 'all'},
        {id: todolist_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
    })
    const addTask = (value: string, todolistId: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeFilterTodolist = (value: FilterType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }
    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterType) => {
        switch (filter) {
            case 'active':
                return tasks.filter((t => !t.isDone));
            case 'completed':
                return tasks.filter((t => t.isDone));
            default:
                return tasks
        }
    }
    const changeStatusTask = (taskId: string, todolistId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTasks({...tasks, [newTodolist.id]: []})
        setTodolists([newTodolist, ...todolists])
    }
    const onChangeTitleTask = (value: string, todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: value} : el)})
    }
    const onChangeSetTitleTodolist = (title: string, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: title} : el))
    }
    let todolist = todolists.map(tl => {
        const filteredTasksForTodolist = getTasksForRender(tasks[tl.id], tl.filter)

        return <Grid item sx={{maxWidth: '400px'}}>
            <Paper elevation={3} sx={{p: '10px'}}>
                <Todolist key={tl.id}
                          title={tl.title}
                          tasks={filteredTasksForTodolist}
                          todolistId={tl.id}
                          addTask={addTask}
                          filter={tl.filter}
                          changeFilterTodolist={changeFilterTodolist}
                          changeStatusTask={changeStatusTask}
                          removeTodolist={removeTodolist}
                          removeTask={removeTask}
                          onChangeTitleTask={onChangeTitleTask}
                          onChangeSetTitleTodolist={onChangeSetTitleTodolist}/>
            </Paper>
        </Grid>


    })
    return (
        <div className="App">
            <AppBar position="static" sx={{mb: '20px'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container  sx={{mb: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2} >
                    {todolist}
                </Grid>
            </Container>


        </div>
    );
}

export default App;
