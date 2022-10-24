import React from "react";
import { useDispatch } from "react-redux"
import { orderByName, filterByDiets, orderByScore, getAllRecipes } from "../../Redux/actions/actions"
import style from "./FilterBy.module.css"


export default function FilteredBy({ setOrder, setPagActual }) {

	const dispatch = useDispatch()


	const handleOrderByName = (e) => {
		e.preventDefault()
		dispatch(orderByName(e.target.value))
		// console.log(orderByName(e.target.value))
		setOrder(`${e.target.value}`)


	}

	const handelFilterDiets = (e) => {
		// e.preventDefault()
		dispatch(filterByDiets(e.target.value))
		setPagActual(1)
		setOrder(`${e.target.value}`)
		// console.log(filterByDiets(e.target.value))
	}

	const handleOrderByScore = (e) => {
		e.preventDefault()
		dispatch(orderByScore(e.target.value))
		setPagActual(1)
		setOrder(`${e.target.value}`)
	}

	const resetFilter = () => {
		dispatch(getAllRecipes())
		setOrder("")
	}

	return (
		<div className={style.div}>

			<div className={style.diet}>
				<select name="select" defaultValue='Filter by type' onChange={e => handelFilterDiets(e)}>
					<option disabled>Filter by type</option>

					<option value="all">All</option>
					<option value="gluten free">Gluten Free</option>
					<option value="ketogenic">Ketogenic</option>
					<option value="vegetarian">Vegetarian</option>
					<option value="lacto vegetarian">Lacto Vegetarian</option>
					<option value="ovo vegetarian">Ovo Vegetarian</option>
					<option value="lacto ovo">Lacto Ovo</option>
					<option value="vegan">Vegan</option>
					<option value="pescatarian">Pescetarian</option>
					<option value="paleolithic">Paleolithic</option>
					<option value="fodmap friendly">Low Fodmap</option>
					<option value="whole 30">Whole 30</option>
					<option value="dairy free">Dairy Free</option>
					<option value="lacto ovo vegetarian">Lacto Ovo egetarian</option>

				</select>
			</div>
			<div>
				<div className={style.order}>
					<select defaultValue="Filter Alfabetico" onChange={handleOrderByName}>
						<option disabled >Filter Alfabetico</option>
						<option value="asc">A - Z</option>
						<option value="desc">Z - A</option>
					</select>
				</div>
			</div>
			<div className={style.score}>
				<select defaultValue="Order by score" onChange={e => handleOrderByScore(e)}>
					<option disabled>Order by score</option>
					<option value="mayor">Min</option>
					<option value="menor">Max</option>
				</select>
			</div>
			<div>
				<button className={style.btn} onClick={resetFilter}>Reset</button>
			</div>
		</div>
	)

}


