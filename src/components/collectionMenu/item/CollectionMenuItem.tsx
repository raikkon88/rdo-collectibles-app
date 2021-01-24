import React from 'react'

import {Button, makeStyles, Grid} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  fullWidth: {
    width: '100%'
  },
  icon: {
    position: 'relative',
    top: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backFull: {
    backgroundColor: '#1D9B2E',
  },
  backNotFull: {
    backgroundColor: '#5A5A5A',
  }
}))

export interface CollectionMenuItemParams {
  name: string
  length: Number
  count: Number
  onClick: any
  fullWidth: boolean
}


const CollectionMenuItem = ({name, onClick, count, length, fullWidth} : CollectionMenuItemParams) => {

  const classes = useStyles()
  const classNames = fullWidth ? clsx(classes.root, classes.fullWidth) : classes.root
  
  const Icon = React.useMemo(() => {
    return <div className={clsx(classes.icon, (count === length ? classes.backFull : classes.backNotFull))}>
      <span>{count}/{length}</span>
    </div>
  }, [count, length, classes])

  return <Button 
    variant='contained' 
    color="primary" 
    onClick={onClick} 
    className={classNames}>
      <Grid container justify='space-between' alignItems='center'>
        <span>{name}</span>
        {Icon}
      </Grid>
    </Button>
}

export default CollectionMenuItem