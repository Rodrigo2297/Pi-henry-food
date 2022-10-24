import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getRecipesId } from "../../Redux/actions/actions";
import style from "./RecipeDetails.module.css"
import img from "../image/deafultcreate.jpg"


const RecipeDetails = () => {
    let key = 1
    const { id } = useParams()
    const myRecipe = useSelector(state => state.details)


    const dispatch = useDispatch()

    // console.log(myRecipe)

    useEffect(() => {
        dispatch(getRecipesId(id))
    }, [dispatch, id])

    return (
        <div className={style.divcont}>
            <div className={style.link}>
                <Link to="/home">
                    <button className={style.btn}>Volver</button>
                </Link>

            </div>
            {
                myRecipe?.length > 0 ?
                    <div className={style.details}>
                        {/* <h1>{myRecipe.id}</h1> */}

                        {
                            myRecipe[0].image ? (
                                <div className={style.imga}>
                                    <img src={myRecipe[0]?.image} alt="" />
                                </div>
                            ) : (
                                <div className={style.imga}>
                                    <img src={img} alt="img" />
                                </div>
                            )
                        }


                        <div >

                            <h2>Name: {myRecipe[0].name ? myRecipe[0].name : "Cargando Nombre"}</h2>
                        </div>

                        <div className={style.summary}>

                            <h4 className={style.summ}>Summary: </h4>
                            {myRecipe[0].summary ? myRecipe[0].summary : null}
                        </div>

                        <div className={style.healthScore}>

                            <h4>Health Score: {myRecipe[0]?.healthScore}</h4>
                        </div>
                        {/* <div className={style.score}>

                            <h4>Score: {myRecipe[0].score ? myRecipe[0].score : null}</h4>

                        </div> */}

                        <div className={style.dishTypes}>

                            <h4>DishTypes:</h4>
                            {
                                myRecipe[0].dishTypes ? (
                                    <div className={style.dishTypesdiv}>
                                        {myRecipe[0].dishTypes.join(" - ")}
                                    </div>
                                ) : (
                                    "No tiene Dish Types"
                                )
                            }

                        </div>

                        <div className={style.diets}>
                            <h4> Diets:</h4>
                            {
                                myRecipe[0].dietTypes?.map(diet => (
                                    <ol key={key++}> {diet.name ? diet.name : diet}</ol>
                                ))
                            }

                        </div>

                        <div className={style.steps}>
                            <div className={style.tstep}>
                                <h4>Steps:</h4>
                            </div>
                            {
                                myRecipe[0].steps ? (
                                    <div className={style.step}>
                                        {
                                            typeof myRecipe[0]?.steps !== "string" ? myRecipe[0].steps?.map(e => {
                                                return (

                                                    <ol className={style.listep} key={key++}>{e.number}_ {e.step}</ol>
                                                )
                                            }) :
                                                <ol className={style.listep} key={key++}><li>{myRecipe[0].steps}</li></ol>
                                        }
                                    </div>
                                ) : ("No tiene steps")
                            }


                        </div>
                    </div> : <p>Cargando .....</p>
            }

        </div>
    )

}

export default RecipeDetails