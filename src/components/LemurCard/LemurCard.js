import React from 'react'
import './LemurCard.css'

function LemurCard({lemur}) {
  const {name, src} = lemur
  console.log()
  return (
    <div className='lemur-card'>
      <h2>{name}</h2>
      <img src={src} alt='nice lemur' className='lemur-card__image'/>
    </div>
  )
}

export default LemurCard