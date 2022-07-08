import {atom, selector} from 'recoil'
import { categoryState } from './categoryState'
import { searchState } from './searchState'

const allLemursState = atom({
    key: 'allLemursState', // unique identifier for state 
    default: [] // initial value of state
})

const lemursByNameState = selector({
    key: 'lemursByNameState',
    get: ({get}) => {
        
        const allLemurs = get(allLemursState)
        const name = get(searchState)

        const nameFilteredLemurs = allLemurs.filter(lemur => {
            if(name === ''){
                return true
            } else {
                return lemur.name.toLowerCase().includes(name.toLowerCase())
            }  
        })

        return nameFilteredLemurs
    }
})

const lemursByNameAndCatState = selector({
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

export {allLemursState, lemursByNameAndCatState}