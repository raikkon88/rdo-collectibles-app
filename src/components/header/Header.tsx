import React from 'react'

import {Grid, Typography, Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    margin: theme.spacing(1)
  }
}))


export interface HeaderParams{
  onExport: () => void,
  onImport: () => void
}

const Header = ({onExport, onImport} : HeaderParams) => {
  const classes = useStyles()
  return <Grid container alignItems="center" justify="space-between">
    <Typography variant={'h2'}>
      Collectibles
    </Typography>
    <Grid>
      <Button variant='outlined' onClick={() => {}} className={classes.button}>
        General Map
      </Button>
      <Button variant='outlined' onClick={() => {}} className={classes.button}>
        Collectibles Map
      </Button>
      <Button variant='outlined' onClick={onExport} className={classes.button}>
        Export
      </Button>
      <Button variant='outlined' onClick={onImport} className={classes.button}>
        Import
      </Button>
    </Grid>
  </Grid>
}

export default Header