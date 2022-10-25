import { useEffect, useState } from "react";
import imgPorDef from "../../img/ImagenPorDefecto.png";
import "../../style/components/tabla/listarPasturas.css"
import { ActualizarPastura } from "../formulario/ActualizarPastura";
import  ReactHtmlTableToExcel  from "react-html-table-to-excel";
import * as xlsx from 'xlsx';


export const ListarPasturas = ({ listPasturas }) => {

    const [clickEdit, setClickEdit] = useState(false);
    const [detalle, setDetalle] = useState([]);
    const [excelImportado, setExcelImportado] = useState([]);
    const [datosIguales, setDatosIguales] = useState([]);
    const [click, setClick] = useState(false);
    

    const obtenerDetallePorId = (id) => {
        fetch('http://localhost:1234/pastura/search/'+id)
            .then(response => response.json())
            .then(data => {
                setDetalle(data.pastura);
            });
        setClickEdit(true);
    }

    const eliminarPastura = (id)=> {
        fetch('http://localhost:1234/pastura/delete/'+id, {
        method: 'DELETE',
        }).then(res => console.log(res))
    }

    const handleFile = async (e) => {

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = xlsx.read(data)

        const workSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(workSheet);


        setExcelImportado( jsonData );  
        
        console.log(excelImportado.Especie);

        
    
    }

    const importarExcel = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(excelImportado)
        };

        fetch("http://localhost:1234/pastura/excel", requestOptions)
        .then(response => response.json(response))
        .catch(error => console.error('Error:', error))
        .then(response => {
            setDatosIguales(response);
        });

        console.log(datosIguales);
    };

  return (
    <>
         <div className="excel" align="center">
            <ReactHtmlTableToExcel 
                id="botonExportExcel"
                className="btn btn-primary"
                table="tablaExcel"
                filename="PasturasExcel"
                sheet="Pagina 1"
                buttonText="Exportar a Excel"
            />
        </div>
        <div>
            <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(e) => handleFile(e)} />
        </div>
        <button type="button" onClick={() => importarExcel()}>Excel</button>
        <div>
        <table hidden className="table" id="tablaExcel">
                    <thead className="table-danger">
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
                            </tr>
                        )}
                    </tbody>
                </table>
        </div>

        <div className="view">
            <div className="wrapper">
                <table className="table">
                    <thead className="table-danger">
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
                                <td>{list.img ? <img src={list.img} alt='' /> : <img src={imgPorDef} alt='' />}</td>
                                <td>
                                    <button type="button" id="edit" className="btn btn-success me-2" onClick={() => {obtenerDetallePorId(list._id)}} >Editar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => eliminarPastura(list._id) }>Borrar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {clickEdit && detalle !== null ? <ActualizarPastura detalle={detalle} setClickEdit={setClickEdit} setDetalle={setDetalle} /> : null}    
        </div>
    </>
  )
}
