import {tasksReducer, TasksStateType} from "./tasks-reducer";

import {addTodolistAC, todolistsReducer, TodolistType,} from "./todolists-reducer";

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
