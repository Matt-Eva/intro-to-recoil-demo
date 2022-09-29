import React from 'react'
import {categoryState} from '../../state/CategoryState'
import {useRecoilState} from 'recoil'

function CategorySelect() {
    const [category, setCategory] = useRecoilState(categoryState)

  return (
    <div>
        <label>Filter By Age:</label>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value='All'>All</option>
            <option value='Old'>Old</option>
            <option value='Middle-Aged'>Middle-Aged</option>
            <option value='Young'>Young</option>
        </select>
    </div>
  )
}

export default CategorySelect