import React from 'react'
import { ListItemSecondaryAction, ListItem, ListItemText, IconButton } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import {CollectiblesDispatcher} from '../../context/CollectiblesContext'

export interface CollectibleParams {
  name:string
  count:number
  collection:string
}

const Collectible = ({name, count, collection}: CollectibleParams) => {

  const {collectiblesDispatcher} = React.useContext(CollectiblesDispatcher)

  return <ListItem>
    <ListItemText primary={`${count} -- ${name}`}/>
    <ListItemSecondaryAction>
      <IconButton onClick={() => collectiblesDispatcher({ type: 'updateCollectible', collection: collection, name: name, count: count + 1})}>
        <ArrowDropUpIcon />
      </IconButton>
      <IconButton onClick={() => collectiblesDispatcher({ type: 'updateCollectible', collection: collection, name: name, count: count - 1})}>
        <ArrowDropDownIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

export default Collectible
