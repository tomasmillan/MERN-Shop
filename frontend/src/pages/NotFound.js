import React from 'react'
import { CiFaceFrown } from 'react-icons/ci'
import '../styles/notfound.css'

const NotFound = () => {
  return (
    <div className='error404'>
      <CiFaceFrown className='sadFace' />
      <h1>Error 404</h1>
      <h2>Pagina No encontrada</h2>
      <p>La pagina que estas buscando no existe o un error a ocurrido.</p>
    </div>
  )
}

export default NotFound