import React from 'react'

import {Button, makeStyles} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  fullWidth: {
    width: '100%'
  },


}))

export interface CollectionMenuItemParams {
  name: string
  onClick: any
  fullWidth: boolean
}

const CollectionMenuItem = ({name, onClick, fullWidth} : CollectionMenuItemParams) => {
  
  const classes = useStyles()
  const classNames = fullWidth ? clsx(classes.root, classes.fullWidth) : classes.root
  
  return <Button 
    variant='contained' 
    color="primary" 
    onClick={onClick} 
    className={classNames}>{name}</Button>
}

export default CollectionMenuItem