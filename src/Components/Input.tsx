import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputType = {
    inputValue: string
    callback: (value: string) => void
    addNewTask: () => void

}
const Input: React.FC<InputType> = ({inputValue, callback, addNewTask,}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask()
        }
    }
    return (
        <div>
            <input value={inputValue} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
        </div>
    );
}


export default Input;