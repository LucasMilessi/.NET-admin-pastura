import { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import imgPorDef from "../../img/ImagenPorDefecto.png";
import "../../style/components/tabla/listarPasturas.css"
import { ActualizarPastura } from "../formulario/ActualizarPastura";

export const ListarPasturas = ({ listPasturas }) => {

    const [imagen, setImagen] = useState([]);
    const [clickEdit, setClickEdit] = useState(false);
    const [detalle, setDetalle] = useState([]);


    // useEffect(() => {
    //     obtenerDetallePorId();
    // }, [clickEdit])
    

    const obtenerDetallePorId = (id) => {
        fetch('https://Pasturas-Back.fernandoh11.repl.co/pastura/search/' + id)
            .then(response => response.json())
            .then(data => {
                setDetalle(data);
            });
        console.log(detalle);
        setClickEdit(true);
    }

    // useEffect(() => {
    //     eliminarPastura();
    // })

    // const contruirImg = async() => {

    //     console.log(listPasturas.length);
    //     console.log(listPasturas[11].img);

    //     for (let i = 0; i < listPasturas.length; i++) {

    //         console.log(listPasturas[i].img);

    //     const base64 = await Base64.decode(listPasturas[i].img.data);
    //     const url = await listPasturas[i].img.contentType;

    //     const imagen = await base64+','+url;  

    //     setImagen({...imagen, imagen})
    //     }
    // }

    // if(listPasturas.img !== null){
    //     contruirImg();
    // }

    const eliminarPastura = (id)=> {
        fetch('http://localhost:1234/pastura/delete/'+id, {
        method: 'DELETE',
        }).then(res => console.log(res))
    }

    console.log(imagen);

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
                        <tr key={list._id}>
                            <td>{list.familia}</td>
                            <td>{list.especie}</td>
                            <td>{list.tipo_vegetativo}</td>
                            <td>{list.rizoma_engrozado}</td>
                            <td>{list.macollo1}</td>
                            <td>{list.macollo2}</td>
                            <td>{list.consistecia_de_la_ligula}</td>
                            <td>{list.forma_de_la_ligula}</td>
                            <td>{list.tamanio}</td>
                            <td>{list.otra_caracteristica_ligula}</td>
                            <td>{list.color_de_la_ligula}</td>
                            <td>{list.forma_de_la_lamina}</td>
                            <td>{list.canaliculada}</td>
                            <td>{list.tipo_de_lamina}</td>
                            <td>{list.apice}</td>
                            <td>{list.nervadura_central_marcada}</td>
                            <td>{list.observaciones}</td>
                            <td>{list.pelos}</td>
                            <td>{list.ubicación_de_pelos}</td>
                            <td>{list.observacion}</td>
                            <td>{list.observaciones_generales}</td>
                            <td>{list.ciclo_de_vida}</td>
                            <td>{list.ciclo_productivo}</td>
                            <td>{list.tipo_productivo}</td>
                            <td>{list.tipo_de_campo}</td>
                            <td><img src={imgPorDef} /></td>
                            <td>
                            <button type="button" id="edit" class="btn btn-primary" onClick={() => {obtenerDetallePorId(list._id)}} >Editar</button>
                                <button type="button" class="btn btn-danger" onClick={() => eliminarPastura(list._id) }>Borrar</button>
                            </td>
                        </tr>
                    )}
                 </tbody>
            </table>
        </div>
        {clickEdit && <ActualizarPastura detalle={detalle} setClickEdit={setClickEdit} setDetalle={setDetalle} />}    
    </div>
  )
}
