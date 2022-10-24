import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postRecipe } from '../../Redux/actions/actions'
import style from "./CreateRecipe.module.css"


const validate = (input) => {

    const val = new RegExp('^[0-9]+$')

    let errors = {}

    if (!input.name) {
        errors.name = " Nombre es requerido"
    }

    if (!input.summary) {
        errors.summary = "Summary es requerido"
    }
    if (input.score < 0 || input.score > 100 || !val.test(input.score)) errors.score = "puntuacion de 0 a 100"
    if (input.healthScore < 0 || input.healthScore > 100 || !val.test(input.healthScore)) errors.healthScore = 'healthScore de 0 a 100'

    return errors
}

const CreateRecipe = () => {

    const disaptch = useDispatch()
    const navigate = useNavigate()
    const ditesList = useSelector(state => state.dietTypes)

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        image: '',
        steps: '',
        dietTypes: []
    })

    console.log(input)

    useEffect(() => {
        disaptch(getTypes())
    }, [disaptch])


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({    //hago una copia del form
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {

        if (!input.dietTypes.includes(e.target.value)) {
            setInput({
                ...input,
                dietTypes: [...input.dietTypes, e.target.value]
            })
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        disaptch(postRecipe(input))
        alert("Receta creada corrrectamente")
        setInput({
            name: '',
            summary: '',
            score: '',
            healthScore: '',
            image: '',
            steps: '',
            dietTypes: []
        })
        navigate('/home')
    }



    const handleDelete = (e) => {
        setInput({
            ...input,
            dietTypes: input.dietTypes.filter(diet => diet !== e)
        })
    }

    return (
        <div className={style.divcont}>
            <div className={style.create}>
                <Link to="/home"><button>Volver al Home</button></Link>
                <h1>Crear Receta</h1>
                <form className={style.addform} onSubmit={(e) => { handleSubmit(e) }}>
                    <div>
                        <label>Name:</label>
                        <input
                            placeholder="Name"
                            type="text"
                            name='name'
                            value={input.name}
                            onChange={e => handleChange(e)}
                        />
                        {
                            errors.name && (
                                <p>{errors.name}</p>
                            )
                        }
                    </div>

                    <div>
                        <label>Summary:</label>
                        <input
                            placeholder="Summary"
                            type="text"
                            name='summary'
                            value={input.summary}
                            onChange={e => handleChange(e)}
                        />
                        {
                            errors.summary && (
                                <p>{errors.summary}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Score:</label>
                        <input
                            placeholder="Score"
                            type="text"
                            name='score'
                            min="0" max="100"
                            value={input.score}
                            onChange={e => handleChange(e)}
                        />
                        {
                            errors.score & (
                                <p>{errors.score}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Health Score:</label>
                        <input
                            placeholder="Health Score"
                            type="text"
                            name='healthScore'
                            min="0" max="100"
                            value={input.healthScore}
                            onChange={e => handleChange(e)}
                        />
                        {
                            errors.healthScore && (
                                <p>{errors.healthScore}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Steps:</label>
                        <input
                            placeholder="Steps"
                            type="text"
                            name='steps'
                            value={input.steps}
                            onChange={e => handleChange(e)}
                        />
                        {
                            errors.steps && (
                                <p>{errors.steps}</p>
                            )
                        }
                    </div>
                    <div>
                        <h3>Diet Types:</h3>
                        <select className={style.diets} onChange={e => handleSelect(e)}>
                            {
                                ditesList.map((type, i) => {
                                    return (<option key={i} value={type}>{type}</option>)
                                }
                                )
                            }
                        </select>
                        {input.dietTypes.map((e, i) => {
                            return (
                                <div key={i}>
                                    <h5 className={style.diet}>{e}</h5>
                                    <button onClick={() => handleDelete(e)}>X</button>
                                </div>
                            )
                        })}
                        {errors.hasOwnProperty("name") || errors.hasOwnProperty('summary') || errors.hasOwnProperty("score") || errors.hasOwnProperty('healthScore') ? <p>Complete todos los campos</p> : <button type='submit'>Crear Receta</button>}
                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateRecipe