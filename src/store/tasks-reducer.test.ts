import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer, TasksStateType
} from "./tasks-reducer";

import {addTodolistAC,removeTodolistAC,} from "./todolists-reducer";
let todolistId1:string;
let todolistId2:string;
let startState: TasksStateType;
beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

     startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }
})

test('correct task should be removed', () => {
    //data

    const taskId = startState[todolistId1][1].id
    //code

    const endState = tasksReducer(startState, removeTaskAC(taskId, todolistId1))
    //checking
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(3);
});
test('correct task should be added', () => {
    //data

    const newTaskTitle = "Bread"
    //code

    const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todolistId1))
    //checking
    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe("Bread");
});
test('correct title of task title should be changed', () => {
    //data

    const newTaskTitle = "Bread"
    const taskIdForChanging = startState[todolistId2][1].id
    //code

    const endState = tasksReducer(startState, changeTaskTitleAC(newTaskTitle, todolistId2, taskIdForChanging))
    //checking
    expect(endState[todolistId2][1].title).toBe("Bread");

});
test('correct status task should be changed', () => {
    //data

    const newStatus: boolean = false
    const taskIdForChanging = startState[todolistId1][0].id
    //code

    const endState = tasksReducer(startState, changeTaskStatusAC(taskIdForChanging, todolistId1, newStatus))
    //checking
    expect(endState[todolistId1][0].isDone).toBe(false);

});
test('correct array of tasks should be removed', () => {
    //data

    //code
    const endState = tasksReducer(startState, removeTodolistAC(todolistId1))
    //checking
    expect(Object.keys(endState).includes(todolistId1)).toBe(false);

});
test('correct new array of tasks  should be added for new todolist', () => {

    const title = 'New Todolist'

    const endState = tasksReducer(startState, addTodolistAC(title))
    const keys = Object.keys(endState)
        expect(keys.length).toBe(3);

});