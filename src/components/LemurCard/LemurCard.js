import React from 'react'
import './LemurCard.css'

function LemurCard({lemur}) {
  const {name, src} = lemur
  console.log()
  return (
    <div>
      <h2>{name}</h2>
      <img src={src} alt='nice lemur'/>
    </div>
  )
}

export default LemurCard