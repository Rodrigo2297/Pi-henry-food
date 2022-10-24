
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../Redux/actions/actions'
import { Card } from "../Card/Card"
import { Paginacion } from '../Paginacion/Paginacion'
import FilteredBy from '../FilterBy/FilterBy'
import { NavBar } from "../NavBar/NavBar"
import { SearchBar } from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import style from "./Home.module.css"


function Home() {
	let key = 1
	const recipes = useSelector(state => state.recipes)
	const dispatch = useDispatch()
	// const diets = useSelector(state => state.allDiets)

	// console.log(typesAll)

	const [, setOrder] = useState('')

	const [pagActual, setPagActual] = useState(1)
	const [recipePorPag] = useState(9)

	const indexOfLastRecipe = pagActual * recipePorPag
	const indexOfFirtRecipe = indexOfLastRecipe - recipePorPag
	const currentRecipes = recipes.slice(indexOfFirtRecipe, indexOfLastRecipe)

	const paginado = (pageNumber) => {
		setPagActual(pageNumber)
	}


	useEffect(() => {
		dispatch(getAllRecipes())
	}, [dispatch])



	return (
		<div className={style.container}>

			<nav className={style.Navbar}>

				<div className={style.navbar}>
					<NavBar />
				</div>

				<div className={style.filter}>
					<FilteredBy
						setOrder={setOrder}
						setPagActual={setPagActual}
					/>
				</div>


				<div className={style.search}>
					<SearchBar />
				</div>

			</nav>


			<Paginacion
				recipePorPag={recipePorPag}
				recipes={recipes.length}
				paginado={paginado}
			/>


			<div className={style.divCard}>
				{
					currentRecipes?.map((recipe) => {
						return (
							<div key={key++}>
								<Link to={`/home/${recipe.id}`}>

									<Card
										image={recipe.image}
										name={recipe.name}
										dietTypes={recipe.dietTypes}
									/>

								</Link>

							</div>
						)
					})
				}
			</div>

			<Paginacion
				recipePorPag={recipePorPag}
				recipes={recipes.length}
				paginado={paginado}
			/>

		</div>
	)
}

export default Home