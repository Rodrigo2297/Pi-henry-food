import React from 'react'
import style from "./Paginacion.module.css"


export function Paginacion({ recipePorPag, recipes, paginado, pagActual }) {

    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(recipes / recipePorPag); i++) {
        pageNumbers.push(i)

    }


    return (
        <div className={style.pagination}>

            {
                pageNumbers?.map((number, index) => {
                    return (

                        <button
                            key={index}
                            onClick={() => paginado(number)}
                            // eslint-disable-next-line eqeqeq
                            className={pageNumbers === pagActual ? "active" : ""}
                        >{number}</button>

                    )
                })
            }

        </div>
    )
}


