import React from 'react'
import style from "./Card.module.css"
import img from "../image/deafultcreate.jpg"


export function Card({ image, name, dietTypes }) {


    return (
        <div>
            <div className={style.card}>

                <div >
                    {
                        image ? (
                            <div >
                                <img src={image} alt="" className={style.img} />
                            </div>
                        ) : (
                            <div>
                                <img src={img} alt="img" className={style.img} />
                            </div>
                        )
                    }
                </div>

                <div className={style.divnamediet}>
                    <h3>{name}</h3>
                    <h4>Diets: {dietTypes?.map(diet => (diet.name ? diet.name : diet)).join(" - ")}</h4>
                </div>

            </div>

        </div>
    )
}


