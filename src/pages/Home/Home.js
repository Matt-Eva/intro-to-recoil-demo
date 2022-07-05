import React, {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {allLemursState} from "../../state/AllLemursState"
import LemurContainer from '../../components/LemurContainer/LemurContainer'
import Search from '../../components/Search/Search'

function Home() {
  const [allLemurs, setAllLemurs] = useRecoilState(allLemursState)

  useEffect(() =>{
    fetch('http://localhost:3000/lemurs')
    .then(r => r.json())
    .then(data => setAllLemurs(data))
  }, [])

  return (
    <div>
        <Search />
        <LemurContainer />
    </div>
  )
}

export default Home