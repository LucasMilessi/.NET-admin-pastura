import React, { useState } from 'react'
import "../../style/components/formulario/agregarPastura.css"
import { app } from '../../firebase/fb';
import carga from '../../img/carga.gif'
import Swal from 'sweetalert2';

export const AgregarPastura = ({ setClick, todasLasPasturas }) => {

    const [familia, setFamilia] = useState('');
    const [especie, setEspecie] = useState('');
    const [tipo_vegetativo, setTipo_vegetativo] = useState('');
    const [rizoma_engrozado, setRizoma_engrozado] = useState('');
    const [macollo1, setMacollo1] = useState('');
    const [macollo2, setMacollo2] = useState('');
    const [consistecia_de_la_ligula, setConsistecia_de_la_ligula] = useState('');
    const [forma_de_la_ligula, setForma_de_la_ligula] = useState('');
    const [tamanio, setTamanio] = useState('');
    const [otraCaracteristicaLigula, setOtraCaracteristicaLigula] = useState('');
    const [color_de_la_ligula, setColor_de_la_ligula] = useState('');
    const [forma_de_la_lamina, setForma_de_la_lamina] = useState('');
    const [canaliculada, setCanaliculada] = useState('');
    const [tipo_de_lamina, setTipo_de_lamina] = useState('');
    const [apice, setApice] = useState('');
    const [nervadura_central_marcada, setNervadura_central_marcada] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [pelos, setPelos] = useState('');
    const [ubicaciónDePelos, setUbicaciónDePelos] = useState('');
    const [observacion, setObservacion] = useState('');
    const [observacionesGenerales, setObservacionesGenerales] = useState('');
    const [ciclo_de_vida, setCiclo_de_vida] = useState('');
    const [ciclo_productivo, setCiclo_productivo] = useState('');
    const [tipo_productivo, setTipo_productivo] = useState('');
    const [tipoDeCampo, setTipoDeCampo] = useState('');
    const [urlImage, setUrlImage] = useState('');

    const [clickBoton, setClikBoton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const actualizar = () => {
        setClick(false);
    }

    const guardarPastura = async(e) => {

        e.preventDefault();

        let request = {
            "familia": familia,
            "especie": especie,
            "tipo_vegetativo": tipo_vegetativo,
            "rizoma_engrozado": rizoma_engrozado,
            "macollo1": macollo1,
            "macollo2": macollo2,
            "consistecia_de_la_ligula": consistecia_de_la_ligula,
            "forma_de_la_ligula": forma_de_la_ligula,
            "tamanio": tamanio,
            "otra_caracteristica_ligula": otraCaracteristicaLigula,
            "color_de_la_ligula": color_de_la_ligula,
            "forma_de_la_lamina": forma_de_la_lamina,
            "canaliculada": canaliculada,
            "tipo_de_lamina": tipo_de_lamina,
            "apice": apice,
            "nervadura_central_marcada": nervadura_central_marcada,
            "observaciones": observaciones,
            "pelos": pelos,
            "ubicación_de_pelos": ubicaciónDePelos,
            "observacion": observacion,
            "observaciones_generales": observacionesGenerales,
            "ciclo_de_vida": ciclo_de_vida,
            "ciclo_productivo": ciclo_productivo,
            "tipo_productivo": tipo_productivo,
            "tipo_de_campo": tipoDeCampo,
            "img": urlImage,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        await fetch("http://localhost:1234/pastura/create", requestOptions)
        .then(response => response.json(response))
        .catch(error => console.error('Error:', error))
        .then(data => {
            const coleccionRef = app.firestore().collection("archivos");
            coleccionRef.doc(data._id).set({ id: data._id, url: urlImage })
        })
        setClick(false);
        todasLasPasturas();
        alert();
    };

    const alert = () => {
        
        Swal.fire({
            icon: 'success',
            title:'Se creó correctamente',
            timer: 2000,
        })
    }

    const archivoHandler = async(e) => {

        if(e.target.files[0] === undefined) return;

        setClikBoton(true);
        setIsLoading(true);

        const img = e.target.files[0];
        const storageRef = app.storage().ref();
        const archivoPath = storageRef.child(img.name);

        await archivoPath.put(img);

        const imgUrl = await archivoPath.getDownloadURL();
        setUrlImage(imgUrl);
        
        setClikBoton(false);
        setIsLoading(false);
    }




    return (
        <div className='overlay-ag'>

            <div className='contenedorModal-ag'>

                <div className='encabezado-ag'>
                    <h4>Agregar Pastura:</h4>
                    <div className='botonCerrar-ag' onClick={() => actualizar()}>
                        X
                    </div>
                </div>

                <form onSubmit={(e) => guardarPastura(e)}>

                    <div className='contenido-ag'>
                        <div className='columna1'>
                            <label>
                                Familia:
                                <input type='text' placeholder='Ingrese Familia' onChange={(e) => setFamilia(e.target.value)} />
                            </label>
                            <label>
                                Especie:
                                <input type='text' placeholder='Ingrese Especie' onChange={(e) => setEspecie(e.target.value)} />
                            </label>
                            <label>
                                Tipo vegetativo:
                                <input type='text' placeholder='Ingrese Tipo vegetativo' onChange={(e) => setTipo_vegetativo(e.target.value)} />
                            </label>
                            <label>
                                Rizoma Engrozado:
                                <input type='text' placeholder='Rizoma Engrozado' onChange={(e) => setRizoma_engrozado(e.target.value)} />
                            </label>
                            <label>
                                Macollo 1:
                                <input type='text' placeholder='Ingrese Macollo 1' onChange={(e) => setMacollo1(e.target.value)} />
                            </label>
                        </div>
                        <div className='columna2'>
                            <label>
                                Macollo 2:
                                <input type='text' placeholder='Ingrese Macollo 2' onChange={(e) => setMacollo2(e.target.value)} />
                            </label>
                            <label>
                                Consistecia de la ligula:
                                <input type='text' placeholder='Ingrese Consistecia de la ligula' onChange={(e) => setConsistecia_de_la_ligula(e.target.value)} />
                            </label>
                            <label>
                                Forma de la ligula:
                                <input type='text' placeholder='Ingrese Forma de la ligula' onChange={(e) => setForma_de_la_ligula(e.target.value)} />
                            </label>
                            <label>
                                Tamaño:
                                <input type='text' placeholder='Ingrese Tamaño' onChange={(e) => setTamanio(e.target.value)} />
                            </label>
                            <label>
                                Otra Caracteristica Ligula:
                                <input type='text' placeholder='Ingrese Otra Caracteristica Ligula' onChange={(e) => setOtraCaracteristicaLigula(e.target.value)} />
                            </label>
                        </div>
                        <div className='columna3'>
                            <label>
                                Color de la ligula:
                                <input type='text' placeholder='Ingrese Color de la ligula' onChange={(e) => setColor_de_la_ligula(e.target.value)} />
                            </label>
                            <label>
                                Forma de la lamina:
                                <input type='text' placeholder='Ingrese Forma de la lamina' onChange={(e) => setForma_de_la_lamina(e.target.value)} />
                            </label>
                            <label>
                                Canaliculada:
                                <input type='text' placeholder='Ingrese Canaliculada' onChange={(e) => setCanaliculada(e.target.value)} />
                            </label>
                            <label>
                                Tipo de lamina:
                                <input type='text' placeholder='Ingrese Tipo de lamina' onChange={(e) => setTipo_de_lamina(e.target.value)} />
                            </label>
                            <label>
                                Apice:
                                <input type='text' placeholder='Ingrese Apice' onChange={(e) => setApice(e.target.value)} />
                            </label>
                        </div>
                        <div className='columna4'>
                            <label>
                                Nervadura central marcada:
                                <input type='text' placeholder='Ingrese Nervadura central marcada' onChange={(e) => setNervadura_central_marcada(e.target.value)} />
                            </label>
                            <label>
                                Observaciones:
                                <input type='text' placeholder='Ingrese Observaciones' onChange={(e) => setObservaciones(e.target.value)} />
                            </label>
                            <label>
                                Pelos:
                                <input type='text' placeholder='Ingrese Pelos' onChange={(e) => setPelos(e.target.value)} />
                            </label>
                            <label>
                                Ubicación De Pelos:
                                <input type='text' placeholder='Ingrese Ubicación De Pelos' onChange={(e) => setUbicaciónDePelos(e.target.value)} />
                            </label>
                            <label>
                                Observacion:
                                <input type='text' placeholder='Ingrese Observacion' onChange={(e) => setObservacion(e.target.value)} />
                            </label>
                        </div>
                        <div className='columna5'>
                            <label>
                                Observaciones Generales:
                                <input type='text' placeholder='Ingrese Observaciones Generales' onChange={(e) => setObservacionesGenerales(e.target.value)} />
                            </label>
                            <label>
                                Ciclo de vida:
                                <input type='text' placeholder='Ingrese Ciclo de vida' onChange={(e) => setCiclo_de_vida(e.target.value)} />
                            </label>
                            <label>
                                Ciclo productivo:
                                <input type='text' placeholder='Ingrese Ciclo productivo' onChange={(e) => setCiclo_productivo(e.target.value)} />
                            </label>
                            <label>
                                Tipo productivo:
                                <input type='text' placeholder='Ingrese Tipo productivo' onChange={(e) => setTipo_productivo(e.target.value)} />
                            </label>
                            <label>
                                Tipo De Campo:
                                <input type='text' placeholder='Ingrese Tipo De Campo' onChange={(e) => setTipoDeCampo(e.target.value)} />
                            </label>
                        </div>
                        <div className='columna6'>
                            <label>
                                Seleccione una imagen:

                                <div className="file-select-agregar">
                                    <input className='inputBase' type="file" accept='image/*' onChange={(e) => archivoHandler(e)} />
                                </div>
                                <div className='cargaImg'>
                                    {isLoading && <center><img src={carga} alt='' /></center>}
                                </div>
                            </label>
                            {urlImage ? <img src={urlImage} className='imgCrear' alt='' /> : <img className='imgCrear' alt='' /> }

                            <center><button id='agregarPast' disabled={clickBoton} type="submit" className='btn btn-success' >Agregar pastura</button></center>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}


