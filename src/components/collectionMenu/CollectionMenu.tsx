import React from 'react'
import {Grid} from '@material-ui/core'
import CollectionMenuItem, { CollectionMenuItemParams } from './item'

export interface CollectionMenuParams {
  items: CollectionMenuItemParams[]
}

const CollectionMenu = ({items} : CollectionMenuParams) => {

  return <Grid container >
      { items && items.map((menuItem: CollectionMenuItemParams) => 
        <Grid item container xs={12} sm={6} md={4} key={menuItem.name} justify={'center'}>
          <CollectionMenuItem {...menuItem} /> 
        </Grid>)
      }
    </Grid>
}

export default CollectionMenu