import React from 'react';

type ButtonType = {
    title: string
    callback: () => void
}
const Button: React.FC<ButtonType> = ({title, callback}) => {
    const onClickHandler = () => {
        callback()
    }
    return (
        <div>
            <button onClick={onClickHandler}>{title}</button>
        </div>
    );
};

export default Button;