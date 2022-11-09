import React from 'react'
import '../style/pages/home.css'

export const Home = ({ nombre }) => {

    const redirigir = () => {
        window.open("https://es-la.facebook.com/", "_blanck");
    }

  return (
    <>
    <div id='divHome'>
        <img className='imgHome' src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/14405.png' />
        <div>
            <h1>¡¡Bienvenido {nombre}!!</h1>
            <button onClick={ () => redirigir() } >Sitio Web</button>
        </div>
    </div>
    </>
  )
}
