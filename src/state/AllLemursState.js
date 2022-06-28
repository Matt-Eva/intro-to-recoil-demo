import {atom, selector} from 'recoil'
import { searchState } from './SearchState'

export const allLemursState = atom({
    key: 'allLemursState',
    default: []
})

export const lemursFilteredByNameState = selector({
    key: 'filteredByNameState',
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

export const filteredLemursState = selector({
    key: 'filteredLemursState',
    get: ({get}) =>{
        const nameFilteredLemurs = get(lemursFilteredByNameState)
    }
})