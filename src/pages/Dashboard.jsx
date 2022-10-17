import { useEffect, useState } from "react";
import { AgregarPastura } from "../components/formulario/AgregarPastura";
import { ListarPasturas } from "../components/tabla/ListarPasturas";
import "../style/pages/dashboard.css"

const URL_API = "http://localhost:1234/pastura"

export const Dashboard = () => {

    const [listPasturas, setListPasturas] = useState([]);
    const [click, setClick] = useState(false);

    useEffect(() => {
        todasLasPasturas();
    }, [listPasturas])
    

    const todasLasPasturas = () => {

        fetch(URL_API+"/pastura")
        .then(response => response.json(response))
        .catch(error => console.error('Error:', error))
        .then(response => {
            setListPasturas(response.pasturaMap);
            
        });
    }  

    return (
        <div className="dashboard">
            <div className="head">
                <h1>Admin Pasturas</h1>
            </div>
            <div className="listaPastura">
                <button type="button" className="btn btn-primary btnAgregar" onClick={() => setClick(true)} > Agregar una Pastura </button>
                { click && <AgregarPastura setClick={setClick} /> }
                <ListarPasturas listPasturas={listPasturas} />
            </div>
            <div className="footer">

            </div>
        </div>
    );
}