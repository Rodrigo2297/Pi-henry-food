import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Inicio from "./components/Inicio/Inicio";
import Page404 from "./components/Page404/Page404";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/home/:id" element={<RecipeDetails />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
