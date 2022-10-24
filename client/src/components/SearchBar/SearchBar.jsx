import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getByName } from '../../Redux/actions/actions'
import style from "./SearchBar.module.css"


export function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(getByName(name))

        setName('')

    }


    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }


    return (
        <form onSubmit={e => onSubmit(e)}>
            <input
                className={style.input}
                type="text"
                value={name}
                placeholder='Buscar...'
                onChange={e => handleInput(e)}
            />
            <input className={style.input2} type="submit" value="🔍" />
        </form>
    )
}

