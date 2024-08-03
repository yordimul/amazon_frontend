import { createContext, useReducer} from 'react'

export const DataContext =createContext()

export const DataProvider = ({children,reducer,initialstate}) => {
    return(
        <DataContext.Provider value={useReducer(reducer, initialstate)}>
       {children}
        </DataContext.Provider>
    )



}
