import React from 'react'
import { Paper, ListItemSecondaryAction, ListItem, ListItemText, IconButton, makeStyles } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export interface CollectibleParams {
  name:string
  count:number
  collection:string
  onUpArrowClick: () => any
  onDownArrowClick: () => any
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: 10
  }
}))

const Collectible = ({name, count, onUpArrowClick, onDownArrowClick}: CollectibleParams) => {

  const classes = useStyles()

  return <ListItem component={Paper} className={classes.root}>
    <ListItemText primary={`${name}`} secondary={`${count}`}/>
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
