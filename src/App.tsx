import React from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {
    addTodolistAC,
    TodolistType
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store/store";


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, TodolistType[]>((state) => state.todolistsReducer)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    let todolist = todolists.map((tl: TodolistType) => {
        return <Grid key={tl.id} item sx={{maxWidth: '400px'}}>
            <Paper elevation={3} sx={{p: '10px'}}>
                <Todolist
                    todolist={tl}
                          />
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
                <Grid container sx={{mb: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolist}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
