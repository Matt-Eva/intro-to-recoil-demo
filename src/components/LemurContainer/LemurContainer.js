import React from 'react'
import LemurCard from "../LemurCard/LemurCard"

import { lemursByNameAndCatState } from '../../state/allLemursState'

import { useRecoilValue } from 'recoil'

import './LemurContainer.css'

function LemurContainer() {

  const filteredLemurs = useRecoilValue(lemursByNameAndCatState)

  const lemurList = filteredLemurs.map(lemur => <LemurCard lemur={lemur} key={lemur.id}/>)
  
  return (
    <div className='lemur-container'>{lemurList}</div>
  )
}

export default LemurContainer