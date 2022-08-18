import React from 'react'
import {categoryState} from '../../state/CategoryState'
import {useRecoilState} from 'recoil'

function CategorySelect() {
    const [category, setCategory] = useRecoilState(categoryState)

  return (
    <div>
        <label>Filter By Sex:</label>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value='All'>All</option>
            <option value='F'>Female</option>
            <option value='M'>Male</option>
            <option value='I'>Intersex</option>
        </select>
    </div>
  )
}

export default CategorySelect