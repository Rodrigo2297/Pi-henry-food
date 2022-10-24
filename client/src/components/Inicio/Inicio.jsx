import { Link } from "react-router-dom";
import "./Inicio.css"

export default function Inicio() {
    return (
        <div className="inicio">
            <Link to="/home">
                <button className="boton">Inicio</button>
            </Link>
        </div>
    )
}

