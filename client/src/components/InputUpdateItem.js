import React from 'react'

const InputUpdateItem = ({ name, value, onChangeFunc, placeholder, type = 'text' }) => {
    return (
        <input
            type={type}
            name={name} 
            value={value}
            onChange={onChangeFunc} 
            autoComplete='off' 
            className='formUpdateItem'
            placeholder={placeholder }
        />
    )
}

export default InputUpdateItem
