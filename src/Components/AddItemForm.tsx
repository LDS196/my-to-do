import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddItemFormType = {
    addItem: (value: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = React.memo(({addItem}) => {
    console.log('AddItemForm')
    const errorText = 'Please, enter item title'
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string|null>(null)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onClickAddItemHandler()
        }
        if(error!==null){
            setError(null)
        }
    };
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
            <TextField
                error={!!error ? !!error : !!''}
                multiline
                maxRows={4}
                size={"small"}
                label="Enter title" variant="outlined"
                onChange={onChangeHandler} value={inputValue} onKeyDown={onKeyDownHandler}/>
            <IconButton size={"small"}  onClick={onClickAddItemHandler} color={"primary"}>
                <AddBoxIcon/>
            </IconButton>
            <p className={error ? 'error' : ''}>{error ? error : ''}</p>

        </div>

    )
})