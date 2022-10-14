import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64';
import { Base64 } from "js-base64";
import "../../style/actualizarPastura.css"
import imgPorDef from "../../img/ImagenPorDefecto.png";

const URL_API = "http://localhost:1234/pastura/update/:id"

export const ActualizarPastura = ({detalle, setClickEdit, setDetalle}) => {

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
    const [img, setImg] = useState('');

    const [imagen, setImagen] = useState(''); // Imagen desencriptada que viene de detalle


    useEffect(() => {
        contruirImg();
    }, [detalle])
    

    const contruirImg = async() => {
        
        console.log('Hola');
        const base64 = Base64.decode(detalle.img.data);
        const url = await detalle.img.contentType;

        const imagen = base64+','+url;  

        setImagen(imagen)
    }

    const pasturaPorId = () => {
        
        var datos =  img.split(',')[0];
        var contentType =  img.split(',')[1];

        let request = {
            "familia": familia == "" ? "-" : familia,
            "especie": especie == "" ? "-" : especie,
            "tipo_vegetativo": tipo_vegetativo == "" ? "-" : tipo_vegetativo,
            "rizoma_engrozado": rizoma_engrozado == "" ? "-" : rizoma_engrozado,
            "macollo1": macollo1 == "" ? "-" : macollo1 == "" ? "-" : macollo1,
            "macollo2": macollo2  == "" ? "-" : macollo2 == "" ? "-" : macollo2,
            "consistecia_de_la_ligula": consistecia_de_la_ligula  == "" ? "-" : consistecia_de_la_ligula,
            "forma_de_la_ligula": forma_de_la_ligula == "" ? "-" : forma_de_la_ligula,
            "tamanio": tamanio == "" ? "-" : tamanio,
            "otra_caracteristica_ligula": otraCaracteristicaLigula == "" ? "-" : otraCaracteristicaLigula,
            "color_de_la_ligula": color_de_la_ligula == "" ? "-" : color_de_la_ligula,
            "forma_de_la_lamina": forma_de_la_lamina == "" ? "-" : forma_de_la_lamina,
            "canaliculada": canaliculada == "" ? "-" : canaliculada,
            "tipo_de_lamina": tipo_de_lamina == "" ? "-" : tipo_de_lamina,
            "apice": apice == "" ? "-" : apice,
            "nervadura_central_marcada": nervadura_central_marcada == "" ? "-" : nervadura_central_marcada,
            "observaciones": observaciones == "" ? "-" : observaciones,
            "pelos": pelos == "" ? "-" : pelos,
            "ubicación_de_pelos": ubicaciónDePelos == "" ? "-" : ubicaciónDePelos,
            "observacion": observacion == "" ? "-" : observacion,
            "observaciones_generales": observacionesGenerales == "" ? "-" : observacionesGenerales,
            "ciclo_de_vida": ciclo_de_vida == "" ? "-" : ciclo_de_vida,
            "ciclo_productivo": ciclo_productivo == "" ? "-" : ciclo_productivo,
            "tipo_productivo": tipo_productivo == "" ? "-" : tipo_productivo,
            "tipo_de_campo": tipoDeCampo == "" ? "-" : tipoDeCampo,
            "img": {
                "data": datos,
                "contentType": contentType,
            },
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

         fetch("http://localhost:1234/pastura/update/"+detalle._id, requestOptions)
            .then(response => response.json(response))
            .catch(error => console.error('Error:', error))

         setClickEdit(false);
         setDetalle([]);
    }

    const limpiarCampos = () => {
        setClickEdit(false);
        setDetalle([]);
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

        <form onSubmit={pasturaPorId}>

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

                        <div class="file-select-agregar">
                            <FileBase
                                type="file"
                                accept="image/*"
                                multiple={false}
                                name="src-file1"
                                className="inputBase"
                                onDone={({ base64 }) => setImg(base64)}
                            />
                        </div>

                    </label>
                    { !img ? <img className='imgEdit' src={imagen} alt='' /> : <img className='imgEdit'  src={img} /> }
                    <center><button type="submit" className='btn btn-success btnEdit' >Agregar pastura</button></center>
                </div>
            </div>
        </form>

    </div>
</div>
  )
}
