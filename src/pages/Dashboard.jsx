import { useEffect, useState } from "react";
import { AgregarPastura } from "../components/formulario/AgregarPastura";
import { Logout } from "../components/login/Logout";
import { ListarPasturas } from "../components/tabla/ListarPasturas";
import "../style/pages/dashboard.css"

const URL_API = "http://localhost:1234/pastura"

export  const Dashboard = ({ user }) => {

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
                <div className="divHead">
                    <div className="divImgH3">
                        <img src={user.picture} alt={user.name}></img>
                        <h6><b>{user.name}</b></h6>
                    </div>
                    <p><b>Email:</b> {user.email}</p>
                </div>
                <div className="divH1">
                    <h1>Admin Pasturas</h1>
                </div>
                <div className="divLogout" >
                    <Logout />
                </div>
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