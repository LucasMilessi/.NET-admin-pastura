import { useRef } from "react";
import { useEffect, useState } from "react";
import { AgregarPastura } from "../components/formulario/AgregarPastura";
import { ListarPasturas } from "../components/tabla/ListarPasturas";
import "../style/pages/dashboard.css"
import { ModalExport } from "../components/modal/ModalExport";
import { ModalImport } from "../components/modal/ModalImport";

const URL_API = "http://localhost:1234/pastura"

export  const Dashboard = () => {

    const [listPasturas, setListPasturas] = useState([]);
    const [click, setClick] = useState(false);
    const [clickExport, setClickExport] = useState(false);
    const [clickImport, setClickImport] = useState(false);


    const menu = useRef();
    
    useEffect(() => {
        todasLasPasturas();
    }, []);

   useEffect(()=>{
   activarMenu();
   activarMenu();
   },[]);

    const todasLasPasturas = () => {

        fetch(URL_API+"/pastura")
        .then(response => response.json(response))
        .catch(error => console.error('Error:', error))
        .then(response => {
            setListPasturas(response.pasturaMap);   
        });
    }  

    const activarMenu = () => {
      
        // console.log(menu.current);
        if(menu.current.className=="menuOpen"){
            menu.current.className="menuClosed";
            ocultarMenu();
        }else{
            menu.current.className="menuOpen";
            desplegarMenu();
        }
    }

    const desplegarMenu = () => {
        let lis = menu.current.getElementsByTagName("li");
        let boton = menu.current.getElementsByTagName("button")[0];
        let titulo = menu.current.getElementsByTagName("header")[0];
        let espaciado = 40;
        let time = .5;
        for (let index = 0; index < lis.length; index++) {
            lis[index].style.transitionDelay=time+"s";
           
            lis[index].style.height="50px";
            lis[index].style.width="240px";
            lis[index].style.top=espaciado+"px";
            boton.style.left="180px";
            espaciado+=50;
            time-=.1;
           
       
        }
        lis[0].style.borderTopLeftRadius= "0px";
        lis[0].style.borderTopRightRadius= "0px";
        menu.current.style.transitionDelay=".6s";
        boton.style.opacity="1";
        titulo.style.opacity="1";
        boton.style.transitionDelay=".6s";
        titulo.style.transitionDelay=".6s";
        menu.current.style.width="240px";
        menu.current.style.height="50px";
       
       
    }

    const ocultarMenu = ()=>{
        let lis = menu.current.getElementsByTagName("li");
        let espaciado = 0;
        let boton = menu.current.getElementsByTagName("button")[0];
        let titulo = menu.current.getElementsByTagName("header")[0];
        let time = .1;
        for (let index = 0; index < lis.length; index++) {
            lis[index].style.transitionDelay=time+"s";
            time+=.1;
            lis[index].style.height="5px";
            lis[index].style.width="50px";
            lis[index].style.left="0";
            boton.style.width="50px";
            boton.style.opacity="0";
            lis[index].style.top=espaciado+"px";
            boton.style.left="0px";
            espaciado+=10;
            titulo.style.opacity="0";

        }
        lis[0].style.borderTopLeftRadius= "20px";
        lis[0].style.borderTopRightRadius= "20px";
        boton.style.transitionDelay=".0s";
        titulo.style.transitionDelay=".0s";
        menu.current.style.transitionDelay="0s";
        menu.current.style.width="50px";
        menu.current.style.height="5px";
        
        titulo.style.opacity="0";
        // console.log(menu.current.getElementsByTagName("li"))
    }

    return (
        <div className="dashboard">
            <header id="header">
            <nav id="menuOpen" ref={menu} onClick={()=>{activarMenu()}}>
                <header>Menú</header>
                <ol>
                   <li className="menu-item"><a href="">Home</a></li>
                   <li className="menu-item"><a href="">Lista de Pasturas</a></li>
                   <li className="menu-item"><a onClick={() => setClick(true)}>Crear Pastura</a></li> 
                   <li className="menu-item"><a onClick={() => setClickExport(true)}>Export Excel</a></li>  
                   <li className="menu-item"><a onClick={() => setClickImport(true)}>Import Excel</a></li>
                   <li className="menu-item"><a>Registrar un Admin</a></li>
                </ol>
                <footer>
                    <button aria-label="Toggle menu">X</button>
                </footer>
            </nav>
            </header>
                <div className="listaPastura">
                    { click && <AgregarPastura setClick={setClick} todasLasPasturas={todasLasPasturas} /> }
                    { clickExport && <ModalExport setClickExport={setClickExport} /> }
                    { clickImport && <ModalImport setClickImport={setClickImport} todasLasPasturas={todasLasPasturas} /> }
                    <ListarPasturas listPasturas={listPasturas} todasLasPasturas={todasLasPasturas} />
                </div>
                <div className="footer">

                </div>
        </div>
        
    );
}