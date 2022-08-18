import React from 'react'
import './Search.css'
import {searchState} from '../../state/SearchState'
import {useRecoilState} from 'recoil'

function Search() {
  const [search, setSearch] = useRecoilState(searchState)

  function handleChange(e){
    setSearch(e.target.value)
  }

  return (
    <div className='search'>
      <label>Search by name:</label>
      <input type='text' value={search} onChange={handleChange} />
    </div>
  )
}

export default Search