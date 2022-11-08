import { useState } from 'react';
import * as xlsx from 'xlsx';
import '../../style/components/modal/modalImport.css'
import { ListaRepetidos } from '../tabla/ListaRepetidos';

export const ModalImport = ({ setClickImport, todasLasPasturas }) => {

    const [excelImportado, setExcelImportado] = useState([]);
    const [datosIguales, setDatosIguales] = useState([]);
    const [botonImport, setBotonImport] = useState(true);
    const [clickRepetidos, setClickRepetidos] = useState(false); 
    

    const handleFile = async (e) => {

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = xlsx.read(data)

        const workSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(workSheet);

        setExcelImportado( jsonData );  

        setBotonImport(false);    
    
    }

    const importarExcel = async(e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(excelImportado)
        };

        

        await fetch("http://localhost:1234/pastura/excel", requestOptions)
        .then(response => response.json(response))
        .catch(error => console.error('Error:', error))
        .then(response => {
            
            if(response !== null){
                setDatosIguales(response);
                setClickRepetidos(true);    
            }    
        });

        await todasLasPasturas();

    };


    const limpiarCampos = () => {
        setClickImport(false);
    }

  return (
    <div className='overlay-mod'>

    <div className='contenedorModal-mod'>

        <div className='encabezado-mod'>
            <h4>Importar Excel:</h4>
            <div className='botonCerrar-mod' onClick={ () => limpiarCampos() } >
                X
            </div>
        </div>

        <div className="mb-3 divImport" align="center">
            <input className='form-control form-control-sm' type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(e) => handleFile(e)} />
            <button className="btn btn-primary btnImport" type="button" onClick={(e) => importarExcel(e)} hidden={botonImport} >Importar Excel</button>
        </div>

        { clickRepetidos && <ListaRepetidos datosIguales={datosIguales} setDatosIguales={setDatosIguales} setClickRepetidos={setClickRepetidos} setClickImport={setClickImport} todasLasPasturas={todasLasPasturas} /> }

    </div>
</div>
  )
}
