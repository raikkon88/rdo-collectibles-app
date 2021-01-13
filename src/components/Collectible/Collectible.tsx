import React from 'react'
import { ListItemSecondaryAction, ListItem, ListItemText, IconButton } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export interface CollectibleParams {
  name:string
  count:number
  collection:string
  onUpArrowClick: () => any
  onDownArrowClick: () => any
}

const Collectible = ({name, count, onUpArrowClick, onDownArrowClick}: CollectibleParams) => {

  return <ListItem>
    <ListItemText primary={`${count} -- ${name}`}/>
    <ListItemSecondaryAction>
      <IconButton onClick={onUpArrowClick}>
        <ArrowDropUpIcon />
      </IconButton>
      <IconButton onClick={onDownArrowClick}>
        <ArrowDropDownIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

export default Collectible
