import * as React from 'react'
import emptyCollectibles from '../collectibles.json'

export interface LayoutProps  {
  children: React.ReactNode
}

export enum ACTION {
  INCREASE,
  DECREASE
}

export const CollectiblesContext = React.createContext<any>({})
export const CollectiblesDispatcher = React.createContext<any>({})

function collectiblesReducer(state:any, action:any) {
  let newState = { ...state }
  console.log(state)
  switch(action.type){
    case 'updateCollectible':
      if(action.count < 0) {
        return state
      }
      let collection = state[action.collection]
      collection.collectibleList.find((item:any) => item.name === action.name).count = action.count
      newState[action.collection] = collection
      localStorage.setItem('collectibles', JSON.stringify(newState))
      return newState
    case 'sellCollection':
      let selectedCollection = state[action.collection]
      selectedCollection.collectibleList.forEach((item:any)=> item.count -= 1)
      newState[action.collection] = selectedCollection
      localStorage.setItem('collectibles', JSON.stringify(newState))
      return newState
    case 'import':
      console.log(action.collectibles)
      localStorage.setItem('collectibles', JSON.stringify(action.collectibles))
      return { ...action.collectibles }
    default:
      return state
  }
}

let storedState = localStorage.getItem('collectibles')
let initialState = storedState ? JSON.parse(storedState) : emptyCollectibles

const CollectiblesProvider: React.FC = ({children}) => {

  const [state, dispatch] = React.useReducer(collectiblesReducer, initialState)

  return <CollectiblesDispatcher.Provider value={{collectiblesDispatcher: dispatch}}>
    <CollectiblesContext.Provider value={{collectibles:state}}>
      {children}
    </CollectiblesContext.Provider>
  </CollectiblesDispatcher.Provider>
}

export default CollectiblesProvider
