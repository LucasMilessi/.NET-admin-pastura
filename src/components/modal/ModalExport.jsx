import  ReactHtmlTableToExcel  from "react-html-table-to-excel";

export const ModalExport = ({ setClickExport }) => {

    const limpiarCampos = () => {
        setClickExport(false);
    }



  return (
    <div className='overlay-mod'>

    <div className='contenedorModal-mod'>

        <div className='encabezado-mod'>
            <h4>Exportar Excel:</h4>
            <div className='botonCerrar-mod' onClick={ () => limpiarCampos() } >
                X
            </div>
        </div>

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

    </div>
</div>
  )
}
