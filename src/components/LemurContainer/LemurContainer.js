import React from 'react'
import LemurCard from "../LemurCard/LemurCard"
import { lemursFilteredByNameState } from '../../state/AllLemursState'
import { useRecoilValue } from 'recoil'
import './LemurContainer.css'

function LemurContainer() {
  const filteredLemurs = useRecoilValue(lemursFilteredByNameState)

  const lemurList = filteredLemurs.map(lemur => <LemurCard lemur={lemur} key={lemur.id}/>)
  
  return (
    <div>{lemurList}</div>
  )
}

export default LemurContainer