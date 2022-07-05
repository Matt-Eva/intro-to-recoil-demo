import {atom, selector} from 'recoil'
import { categoryState } from './CategoryState'
import { searchState } from './SearchState'

export const allLemursState = atom({
    key: 'allLemursState',
    default: []
})

const lemursByNameState = selector({
    key: 'lemursByNameState',
    get: ({get}) =>{
        const allLemurs = get(allLemursState)
        const name = get(searchState)
        return allLemurs.filter(lemur => {
            if(name === ''){
                return true
            } else {
                return lemur.name.toLowerCase().includes(name.toLowerCase())
            }  
        })
    }
})

export const lemursByNameAndCatState = selector({
    key: 'lemursByNameAndCatState',
    get: ({get}) =>{
        const lemursByName = get(lemursByNameState)
        const category = get(categoryState)
        return lemursByName.filter(lemur => {
            if(category === 'All'){
                return true
            } else {
                return lemur.sex === category
            }
        })
    }
})