import React from 'react'
import { Link } from 'react-router-dom'
import style from "./Page404.module.css"


export default function Page404() {
    return (
        <div className={style.divpage}>
            <h1>Page404 Not Found</h1>
            <Link to="/home">Volver a Pagina Principal</Link>
        </div>
    )
}
