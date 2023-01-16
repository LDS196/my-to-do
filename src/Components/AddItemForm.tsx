import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (value: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
    const errorText = 'Please, enter item title'
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string>('')
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddItemHandler();
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }
    const onClickAddItemHandler = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim())
        } else {
            setError(errorText)
        }
        setInputValue('')
    }

    return (
        <div>
            <input onChange={onChangeHandler} value={inputValue} onKeyDown={onKeyDownHandler}/>
            <button onClick={onClickAddItemHandler}>Add</button>
            <p>{error ? error : ''}</p>

        </div>

    )
}