import { useEffect } from "react";
import "../../style/components/tabla/listaRepetidos.css"
import { keyRandom } from "../keyRandom/keyRandom";

export const ListaRepetidos = ({ datosIguales, setDatosIguales, setClickRepetidos, setClickImport }) => {

    const limpiarCampos = () => {
        setClickImport(false);
        setClickRepetidos(false);
        setDatosIguales([]);
    }

    const remplazarRepetido = async(value, i) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        await fetch("http://localhost:1234/pastura/updateEspecie/"+value.Especie, requestOptions)
            .then(response => response.json(response))
            .catch(error => console.error('Error:', error))
            //console.log(datosIguales)
            

            console.log(datosIguales);

    }
    
    const ignorarTodos = () => {
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
                <button className="btn btn-warning m-1">Remplazar Todo</button>
                <button className="btn btn-info m-1" onClick={ () => ignorarTodos() }>Ignorar Todo</button>
            </div>

                { datosIguales.map((datos, i) => 
                
                        <div className="divRepetidos" key={keyRandom(10)}>
                            <h6 key={ keyRandom(10) }>{ datos.Especie }</h6>
                            <div className="botonesOpciones">
                                <button key={ keyRandom(10) } className="btn btn-success" type="button" onClick={() => remplazarRepetido(datos, i)} >Remplazar</button>
                                <button key={ keyRandom(10) } className="btn btn-danger" type="button" onClick={() => remplazarRepetido(datos, i)} >Ignorar</button>
                            </div>
                        </div>  

                ) }

        </div>
    </div>
  )
}
