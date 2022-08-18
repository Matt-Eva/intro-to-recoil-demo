import {atom} from 'recoil'

const categoryState = atom({
    key: 'categoryState',
    default: 'All'
})

export {categoryState}