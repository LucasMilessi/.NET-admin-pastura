import { useEffect } from "react";
import "../../style/components/tabla/listaRepetidos.css"
import { keyRandom } from "../keyRandom/keyRandom";
import Swal from "sweetalert2";

export const ListaRepetidos = ({ datosIguales, setDatosIguales, setClickRepetidos, setClickImport, todasLasPasturas }) => {

    const limpiarCampos = () => {
        setClickImport(false);
        setClickRepetidos(false);
        setDatosIguales([]);
    }

    const remplazarRepetido = async(e, value) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        await fetch("http://localhost:1234/pastura/updateEspecie/"+value.Especie, requestOptions)
            .then(response => response.json(response))
            .catch(error => console.error('Error:', error))
           
            const copiaDatosIguales = await datosIguales.filter(datos => datos.Especie !== value.Especie)
            setDatosIguales(copiaDatosIguales);
            todasLasPasturas();

    }

    const remplazarTodos = async(e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosIguales)
        };

        await fetch("http://localhost:1234/pastura/updateEspecieFor", requestOptions)
            .then(response => response.json(response))
            .catch(error => console.error('Error:', error))

            
        await todasLasPasturas();
        remplazarTodo();

    }

    const ignorarPastura = async(value) => {
        const copiaDatosIguales = await datosIguales.filter(datos => datos.Especie !== value.Especie)
        setDatosIguales(copiaDatosIguales);

    }

    const remplazarTodo = () => {
        Swal.fire({
            icon: 'success',
            title:'Se remplazaron todas las pasturas con exito',
            timer: 2000,
        })
        setDatosIguales([]);
        setClickRepetidos(false);
        setClickImport(false);
        ///Alert
    }
    
    const ignorarTodos = () => {
        Swal.fire({
            icon: 'success',
            iconColor: 'turquoise',
            title: 'Se ignoraron todas las pasturas repetidas',
            timer: 2000,
        })
        setDatosIguales([]);
        setClickRepetidos(false);
        setClickImport(false);
        ///Alert
    }

  return (

    <div className='overlay-lis'>

        <div className='contenedorModal-lis'>

            <div className='encabezado-lis'>
                <h4>Pasturas Repetidas:</h4>
                <div className='botonCerrar-lis' onClick={ () => limpiarCampos() } >
                    X
                </div>
            </div>

            <div>
                <button className="btn btn-warning m-1" onClick={(e) => remplazarTodos(e)} >Remplazar Todo</button>
                <button className="btn btn-info m-1" onClick={ () => ignorarTodos() }>Ignorar Todo</button>
            </div>

                { datosIguales.map((datos, i) => 
                
                        <div className="divRepetidos" key={keyRandom(10)}>
                            <h6 key={ keyRandom(10) }>{ datos.Especie }</h6>
                            <div className="botonesOpciones">
                                <button key={ keyRandom(10) } className="btn btn-success" type="button" onClick={(e) => remplazarRepetido(e,datos)} >Remplazar</button>
                                <button key={ keyRandom(10) } className="btn btn-danger" type="button" onClick={() => ignorarPastura(datos)} >Ignorar</button>
                            </div>
                        </div>  

                ) }

        </div>
    </div>
  )
}
