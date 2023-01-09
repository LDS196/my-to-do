import React from 'react';
import {FilterType} from "../App";
import s from './Button.module.css'
type ButtonType = {
    title: FilterType |string
    filter: FilterType
    callback: () => void
}
const Button: React.FC<ButtonType> = ({title, callback,filter}) => {
    // const onClickHandler = () => {
    //     callback()
    // }

    return (
        <div>
            <button className={ filter===title? s.active: undefined} onClick={callback}>{title}</button>
        </div>
    );
};

export default Button;