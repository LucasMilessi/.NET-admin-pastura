import React from 'react'
import '../style/pages/home.css'

export const Home = ({ nombre }) => {

    const redirigir = () => {
        window.open("https://net-front.fernandoh11.repl.co/", "_blanck");
    }

  return (
    <>
    <div id='divHome'>
        <img className='imgHome' src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/14405.png' alt='' />
        <div>
            <h1>¡¡Bienvenido {nombre}!!</h1>
            <button onClick={ () => redirigir() } >Sitio Web</button>
        </div>
    </div>
    </>
  )
}
