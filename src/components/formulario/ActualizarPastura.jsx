import React, { useState, useEffect } from 'react'
import "../../style/actualizarPastura.css"
import { app } from '../../firebase/fb';
import carga from '../../img/carga.gif'
import Swal from "sweetalert2";


export const ActualizarPastura = ({detalle, setClickEdit, setDetalle, todasLasPasturas}) => {

    const [familia, setFamilia] = useState(detalle.familia);
    const [especie, setEspecie] = useState(detalle.especie);
    const [tipo_vegetativo, setTipo_vegetativo] = useState(detalle.tipo_vegetativo);
    const [rizoma_engrozado, setRizoma_engrozado] = useState(detalle.rizoma_engrozado);
    const [macollo1, setMacollo1] = useState(detalle.macollo1);
    const [macollo2, setMacollo2] = useState(detalle.macollo2);
    const [consistecia_de_la_ligula, setConsistecia_de_la_ligula] = useState(detalle.consistecia_de_la_ligula);
    const [forma_de_la_ligula, setForma_de_la_ligula] = useState(detalle.forma_de_la_ligula);
    const [tamanio, setTamanio] = useState(detalle.tamanio);
    const [otraCaracteristicaLigula, setOtraCaracteristicaLigula] = useState(detalle.otraCaracteristicaLigula);
    const [color_de_la_ligula, setColor_de_la_ligula] = useState(detalle.color_de_la_ligula);
    const [forma_de_la_lamina, setForma_de_la_lamina] = useState(detalle.forma_de_la_lamina);
    const [canaliculada, setCanaliculada] = useState(detalle.canaliculada);
    const [tipo_de_lamina, setTipo_de_lamina] = useState(detalle.tipo_de_lamina);
    const [apice, setApice] = useState(detalle.apice);
    const [nervadura_central_marcada, setNervadura_central_marcada] = useState(detalle.nervadura_central_marcada);
    const [observaciones, setObservaciones] = useState(detalle.observaciones);
    const [pelos, setPelos] = useState(detalle.pelos);
    const [ubicaciónDePelos, setUbicaciónDePelos] = useState(detalle.ubicaciónDePelos);
    const [observacion, setObservacion] = useState(detalle.observacion);
    const [observacionesGenerales, setObservacionesGenerales] = useState(detalle.observacionesGenerales);
    const [ciclo_de_vida, setCiclo_de_vida] = useState(detalle.ciclo_de_vida);
    const [ciclo_productivo, setCiclo_productivo] = useState(detalle.ciclo_productivo);
    const [tipo_productivo, setTipo_productivo] = useState(detalle.tipo_productivo);
    const [tipoDeCampo, setTipoDeCampo] = useState(detalle.tipoDeCampo);
    const [img] = useState(detalle.img);

    const [clickBoton, setClikBoton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('')

    
    
        

    const pasturaPorId = async(e) => {
        e.preventDefault();

        let request = {
            "familia": familia === "" ? "-" : familia,
            "especie": especie === "" ? "-" : especie,
            "tipo_vegetativo": tipo_vegetativo === "" ? "-" : tipo_vegetativo,
            "rizoma_engrozado": rizoma_engrozado === "" ? "-" : rizoma_engrozado,
            "macollo1": macollo1 === "" ? "-" : macollo1,
            "macollo2": macollo2  === "" ? "-" : macollo2,
            "consistecia_de_la_ligula": consistecia_de_la_ligula  === "" ? "-" : consistecia_de_la_ligula,
            "forma_de_la_ligula": forma_de_la_ligula === "" ? "-" : forma_de_la_ligula,
            "tamanio": tamanio === "" ? "-" : tamanio,
            "otra_caracteristica_ligula": otraCaracteristicaLigula === "" ? "-" : otraCaracteristicaLigula,
            "color_de_la_ligula": color_de_la_ligula === "" ? "-" : color_de_la_ligula,
            "forma_de_la_lamina": forma_de_la_lamina === "" ? "-" : forma_de_la_lamina,
            "canaliculada": canaliculada === "" ? "-" : canaliculada,
            "tipo_de_lamina": tipo_de_lamina === "" ? "-" : tipo_de_lamina,
            "apice": apice === "" ? "-" : apice,
            "nervadura_central_marcada": nervadura_central_marcada === "" ? "-" : nervadura_central_marcada,
            "observaciones": observaciones === "" ? "-" : observaciones,
            "pelos": pelos === "" ? "-" : pelos,
            "ubicación_de_pelos": ubicaciónDePelos === "" ? "-" : ubicaciónDePelos,
            "observacion": observacion === "" ? "-" : observacion,
            "observaciones_generales": observacionesGenerales === "" ? "-" : observacionesGenerales,
            "ciclo_de_vida": ciclo_de_vida === "" ? "-" : ciclo_de_vida,
            "ciclo_productivo": ciclo_productivo === "" ? "-" : ciclo_productivo,
            "tipo_productivo": tipo_productivo === "" ? "-" : tipo_productivo,
            "tipo_de_campo": tipoDeCampo === "" ? "-" : tipoDeCampo,
            "img": imgUrl ? imgUrl : img,
        };
        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        await fetch("https://net-appi.fernandoh11.repl.co/pastura/update/"+detalle._id, requestOptions)
            .then(response => response.json(response))
            .catch(error => console.error('Error:', error))

        setClickEdit(false);
        setDetalle([]);
        await todasLasPasturas();
        alert();
    }

    const limpiarCampos = () => {
        setClickEdit(false);
        setDetalle([]);
    }

    const alert = () => {
        
        Swal.fire({
            icon: 'success',
            title:'Se actualizó correctamente',
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
        setImgUrl(imgUrl);
        
        setClikBoton(false);
        setIsLoading(false);
    }


  return (
    <div className='overlay'>

    <div className='contenedorModal'>

        <div className='encabezado'>
            <h4>Agregar Pastura:</h4>
            <div className='botonCerrar' onClick={() => limpiarCampos()}>
                X
            </div>
        </div>

        <form onSubmit={(e) => pasturaPorId(e)}>

            <div className='contenido'>
                <div className='col1'>
                    <label>
                        Familia:
                        <input type='text' defaultValue={detalle.familia} placeholder='Ingrese Familia' onChange={(e) => setFamilia(e.target.value)} />
                    </label>
                    <label>
                        Especie:
                        <input type='text' defaultValue={detalle.especie} placeholder='Ingrese Especie' onChange={(e) => setEspecie(e.target.value)} />
                    </label>
                    <label>
                        Tipo vegetativo:
                        <input type='text' defaultValue={detalle.tipo_vegetativo} placeholder='Ingrese Tipo vegetativo' onChange={(e) => setTipo_vegetativo(e.target.value)} />
                    </label>
                    <label>
                        Rizoma Engrozado:
                        <input type='text' defaultValue={detalle.rizoma_engrozado} placeholder='Rizoma Engrozado' onChange={(e) => setRizoma_engrozado(e.target.value)} />
                    </label>
                    <label>
                        Macollo 1:
                        <input type='text' defaultValue={detalle.macollo1} placeholder='Ingrese Macollo 1' onChange={(e) => setMacollo1(e.target.value)} />
                    </label>
                </div>
                <div className='col2'>
                    <label>
                        Macollo 2:
                        <input type='text' defaultValue={detalle.macollo2} placeholder='Ingrese Macollo 2' onChange={(e) => setMacollo2(e.target.value)} />
                    </label>
                    <label>
                        Consistecia de la ligula:
                        <input type='text' defaultValue={detalle.consistecia_de_la_ligula} placeholder='Ingrese Consistecia de la ligula' onChange={(e) => setConsistecia_de_la_ligula(e.target.value)} />
                    </label>
                    <label>
                        Forma de la ligula:
                        <input type='text' defaultValue={detalle.forma_de_la_ligula} placeholder='Ingrese Forma de la ligula' onChange={(e) => setForma_de_la_ligula(e.target.value)} />
                    </label>
                    <label>
                        Tamaño:
                        <input type='text' defaultValue={detalle.tamanio} placeholder='Ingrese Tamaño' onChange={(e) => setTamanio(e.target.value)} />
                    </label>
                    <label>
                        Otra Caracteristica Ligula:
                        <input type='text' defaultValue={detalle.otra_caracteristica_ligula} placeholder='Ingrese Otra Caracteristica Ligula' onChange={(e) => setOtraCaracteristicaLigula(e.target.value)} />
                    </label>
                </div>
                <div className='col3'>
                    <label>
                        Color de la ligula:
                        <input type='text' defaultValue={detalle.color_de_la_ligula} placeholder='Ingrese Color de la ligula' onChange={(e) => setColor_de_la_ligula(e.target.value)} />
                    </label>
                    <label>
                        Forma de la lamina:
                        <input type='text' defaultValue={detalle.forma_de_la_lamina} placeholder='Ingrese Forma de la lamina' onChange={(e) => setForma_de_la_lamina(e.target.value)} />
                    </label>
                    <label>
                        Canaliculada:
                        <input type='text' defaultValue={detalle.canaliculada} placeholder='Ingrese Canaliculada' onChange={(e) => setCanaliculada(e.target.value)} />
                    </label>
                    <label>
                        Tipo de lamina:
                        <input type='text' defaultValue={detalle.tipo_de_lamina} placeholder='Ingrese Tipo de lamina' onChange={(e) => setTipo_de_lamina(e.target.value)} />
                    </label>
                    <label>
                        Apice:
                        <input type='text' defaultValue={detalle.apice} placeholder='Ingrese Apice' onChange={(e) => setApice(e.target.value)} />
                    </label>
                </div>
                <div className='col4'>
                    <label>
                        Nervadura central marcada:
                        <input type='text' defaultValue={detalle.nervadura_central_marcada} placeholder='Ingrese Nervadura central marcada' onChange={(e) => setNervadura_central_marcada(e.target.value)} />
                    </label>
                    <label>
                        Observaciones:
                        <input type='text' defaultValue={detalle.observaciones} placeholder='Ingrese Observaciones' onChange={(e) => setObservaciones(e.target.value)} />
                    </label>
                    <label>
                        Pelos:
                        <input type='text' defaultValue={detalle.pelos} placeholder='Ingrese Pelos' onChange={(e) => setPelos(e.target.value)} />
                    </label>
                    <label>
                        Ubicación De Pelos:
                        <input type='text' defaultValue={detalle.ubicación_de_pelos} placeholder='Ingrese Ubicación De Pelos' onChange={(e) => setUbicaciónDePelos(e.target.value)} />
                    </label>
                    <label>
                        Observacion:
                        <input type='text' defaultValue={detalle.observacion} placeholder='Ingrese Observacion' onChange={(e) => setObservacion(e.target.value)} />
                    </label>
                </div>
                <div className='col5'>
                    <label>
                        Observaciones Generales:
                        <input type='text' defaultValue={detalle.observaciones_generales} placeholder='Ingrese Observaciones Generales' onChange={(e) => setObservacionesGenerales(e.target.value)} />
                    </label>
                    <label>
                        Ciclo de vida:
                        <input type='text' defaultValue={detalle.ciclo_de_vida} placeholder='Ingrese Ciclo de vida' onChange={(e) => setCiclo_de_vida(e.target.value)} />
                    </label>
                    <label>
                        Ciclo productivo:
                        <input type='text' defaultValue={detalle.ciclo_productivo} placeholder='Ingrese Ciclo productivo' onChange={(e) => setCiclo_productivo(e.target.value)} />
                    </label>
                    <label>
                        Tipo productivo:
                        <input type='text' defaultValue={detalle.tipo_productivo} placeholder='Ingrese Tipo productivo' onChange={(e) => setTipo_productivo(e.target.value)} />
                    </label>
                    <label>
                        Tipo De Campo:
                        <input type='text' defaultValue={detalle.tipo_de_campo} placeholder='Ingrese Tipo De Campo' onChange={(e) => setTipoDeCampo(e.target.value)} />
                    </label>
                </div>
                <div className='col6'>
                    <label>
                        Seleccione una imagen:

                        <div className="file-select-agregar">
                            <input className='inputBase' type="file" accept='image/*' onChange={(e) => archivoHandler(e)} />
                        </div>
                        <div className='cargaImg'>
                            {isLoading && <center><img src={carga} alt='' /></center>}
                        </div>
                    </label>
                    {imgUrl ? <img className='imgEdit' src={imgUrl} alt='' /> : <img className='imgEdit' src={detalle.img} alt='' />}
                    <center><button type="submit" disabled={clickBoton} className='btn btn-success btnEdit' >Actualizar pastura</button></center>
                </div>
            </div>
        </form>

    </div>
</div>
  )
}
