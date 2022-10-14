import { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import imgPorDef from "../../img/ImagenPorDefecto.png";
import "../../style/components/tabla/listarPasturas.css"
import { ActualizarPastura } from "../formulario/ActualizarPastura";

export const ListarPasturas = ({ listPasturas }) => {

    const [clickEdit, setClickEdit] = useState(false);
    const [detalle, setDetalle] = useState([]);
    const [imgPorID, setImgPorID] = useState('')
    

    const obtenerDetallePorId = (id) => {
        fetch('http://localhost:1234/pastura/search/'+id)
            .then(response => response.json())
            .then(data => {
                setDetalle(data.pastura);
                setImgPorID(data.image);
            });
        setClickEdit(true);
    }


    const eliminarPastura = (id)=> {
        fetch('http://localhost:1234/pastura/delete/'+id, {
        method: 'DELETE',
        }).then(res => console.log(res))
    }

  return (
    <div class="view">
        <div class="wrapper">
            <table class="table">
                <thead class="table-danger">
                    <tr>
                        <th>Familia</th>
                        <th>Especie</th>
                        <th>Tipo Vegetativo</th>
                        <th>Rizoma Engrozado</th>
                        <th>Macollo 1</th>
                        <th>Macollo 2</th>
                        <th>Consistecia de la ligula</th>
                        <th>Forma de la ligula</th>
                        <th>Tamaño</th>
                        <th>Otra caracteristica ligula</th>
                        <th>Color de la ligula</th>
                        <th>Forma de la lamina</th>
                        <th>Canaliculada</th>
                        <th>Tipo de lamina</th>
                        <th>Apice</th>
                        <th>Nervadura central marcada</th>
                        <th>Observaciones</th>
                        <th>Pelos</th>
                        <th>Ubicación de pelos</th>
                        <th>Observación</th>
                        <th>Observaciones generales</th>
                        <th>Ciclo de Vida</th>
                        <th>Ciclo Productivo</th>
                        <th>Tipo Productivo</th>
                        <th>Tipo de Campo</th>
                        <th>Imagen</th>
                        <th>Editar / Borrar</th>
                    </tr> 
                </thead>
                <tbody>
                    { listPasturas.map((list) => 
                        <tr key={list.pastura._id}>
                            <td>{list.pastura.familia}</td>
                            <td>{list.pastura.especie}</td>
                            <td>{list.pastura.tipo_vegetativo}</td>
                            <td>{list.pastura.rizoma_engrozado}</td>
                            <td>{list.pastura.macollo1}</td>
                            <td>{list.pastura.macollo2}</td>
                            <td>{list.pastura.consistecia_de_la_ligula}</td>
                            <td>{list.pastura.forma_de_la_ligula}</td>
                            <td>{list.pastura.tamanio}</td>
                            <td>{list.pastura.otra_caracteristica_ligula}</td>
                            <td>{list.pastura.color_de_la_ligula}</td>
                            <td>{list.pastura.forma_de_la_lamina}</td>
                            <td>{list.pastura.canaliculada}</td>
                            <td>{list.pastura.tipo_de_lamina}</td>
                            <td>{list.pastura.apice}</td>
                            <td>{list.pastura.nervadura_central_marcada}</td>
                            <td>{list.pastura.observaciones}</td>
                            <td>{list.pastura.pelos}</td>
                            <td>{list.pastura.ubicación_de_pelos}</td>
                            <td>{list.pastura.observacion}</td>
                            <td>{list.pastura.observaciones_generales}</td>
                            <td>{list.pastura.ciclo_de_vida}</td>
                            <td>{list.pastura.ciclo_productivo}</td>
                            <td>{list.pastura.tipo_productivo}</td>
                            <td>{list.pastura.tipo_de_campo}</td>
                            <td>{list.image ? <img src={list.image} /> : <img src={imgPorDef} />}</td>
                            <td>
                            <button type="button" id="edit" class="btn btn-primary" onClick={() => {obtenerDetallePorId(list.pastura._id)}} >Editar</button>
                                <button type="button" class="btn btn-danger" onClick={() => eliminarPastura(list.pastura._id) }>Borrar</button>
                            </td>
                        </tr>
                    )}
                 </tbody>
            </table>
        </div>
        {clickEdit && detalle !== null ? <ActualizarPastura imgPorID={imgPorID} detalle={detalle} setClickEdit={setClickEdit} setDetalle={setDetalle} /> : null}    
    </div>
  )
}
