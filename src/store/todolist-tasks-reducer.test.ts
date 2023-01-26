import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType,} from "../App";
import {addTodolistAC, todolistsReducer,} from "./todolists-reducer";

test('ids should be equal', () => {
    //data
    const startTask: TasksStateType = {};
    const startTodolist: Array<TodolistType> = [];

    //code
    const action = addTodolistAC('new')
    const endTasks = tasksReducer(startTask, action)
    const endTodolists = todolistsReducer(startTodolist, action)
    const idFromTasks = Object.keys(endTasks)[0]
    const todolistId = endTodolists[0].id
    //checking

    expect(idFromTasks).toBe(todolistId);

});
