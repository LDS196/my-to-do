import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanType = {
    onChangeTitle: (value: string) => void
    title: string
}
export const EditableSpan: React.FC<EditableSpanType> = ({title, onChangeTitle}) => {

    let [editMode, setEditMode] = useState<boolean>(false)

    const errorText = 'Please, enter item title';

    let [inputValue, setInputValue] = useState<string>(title)
    let [error, setError] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }
    const onChangeTitleHandler = () => {
        if (inputValue.trim()) {
            onChangeTitle(inputValue.trim())
            setEditMode(false)
        } else {
            setError(errorText)
        }
    }
    const onEditSpan = () => {
        setEditMode(true)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onChangeTitleHandler();
    return (
        editMode
            ? <>
                <input onChange={onChangeHandler} value={inputValue} onKeyDown={onKeyDownHandler}
                       autoFocus={true} onBlur={onChangeTitleHandler}/>
                <p>{error ? error : ''}</p>
            </>
            : <span onDoubleClick={onEditSpan}>{title}</span>

    )
}