import {atom, selector} from 'recoil'
import { categoryState } from './CategoryState'
import { searchState } from './SearchState'

const allLemursState = atom({
    key: 'allLemursState', // unique identifier for state 
    default: [] // initial value of state
})

const lemursByNameState = selector({
    key: 'lemursByNameState',
    get: ({get}) => {
        
        const allLemurs = get(allLemursState)
        const name = get(searchState)

        const nameFilteredLemurs = allLemurs.filter(lemur => name === "" ? true: lemur.name.toLowerCase().includes(name.toLowerCase()))

        return nameFilteredLemurs
    }
})

const lemursByNameAndCatState = selector({
    key: 'lemursByNameAndCatState',
    get: ({get}) =>{

        const lemursByName = get(lemursByNameState)
        const category = get(categoryState)

        return lemursByName.filter(lemur => category === 'All' ? true : lemur.sex === category)
    }

})

export {allLemursState, lemursByNameAndCatState}