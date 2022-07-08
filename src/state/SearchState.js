import {atom} from 'recoil'

 const searchState = atom({
    key: "searchState", // unique identifier
    default: '', // initial state
})

export {searchState}