import "../../style/components/tabla/listaRepetidos.css"

export const ListaRepetidos = ({ datosIguales, setDatosIguales, setClickRepetidos, setModal }) => {

    const limpiarCampos = () => {
        setModal(false);
        setClickRepetidos(false);
        setDatosIguales([]);
    }

    // console.log(datosIguales);


  return (

    <div className='overlay-lis'>

        <div className='contenedorModal-lis'>

            <div className='encabezado-lis'>
                <h4>Pasturas Repetidas:</h4>
                <div className='botonCerrar-lis' onClick={ () => limpiarCampos() } >
                    X
                </div>
            </div>

                { datosIguales.map((datos, i) => 
                
                        <div className="divRepetidos" key={i+3}>
                            <h6 key={ i+345 }>{ datos.Especie }</h6>
                            <button key={ i+543 } className="btn btn-success" type="button">Remplazar</button>
                        </div>  

                ) }

        </div>
    </div>
  )
}
