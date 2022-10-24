import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "./NavBar.module.css"


export function NavBar() {
    return (
        <div className={style.div}>
            <NavLink to="/"><button>Intro</button></NavLink>
            <NavLink to="/home"><button>Recetas</button></NavLink>
            <NavLink to="/create"><button>Create</button></NavLink>
        </div>
    )
}

