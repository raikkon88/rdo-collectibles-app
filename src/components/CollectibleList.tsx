import React from 'react'
import Collectible, { CollectibleParams } from './Collectible'
import {Grid, List, Typography, IconButton} from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import {CollectiblesDispatcher} from '../context/CollectiblesContext'

export interface CollectibleListParams {
  id: string
  name: string
  collectibleList: CollectibleParams[]
}

const CollectibleList = ({name, collectibleList, id}: CollectibleListParams) => {

  const {collectiblesDispatcher} = React.useContext(CollectiblesDispatcher)

  const sellCollection = () => {
    if(collectibleList.map(item => item.count).every(number => number > 0)){
      collectiblesDispatcher({type: 'sellCollection', collection: id})
    }
  }

  return <Grid>
    <Grid container direction='row' alignItems='center' justify='space-between'>
      <Typography variant='h4'>{name}</Typography>
      <IconButton onClick={sellCollection}>
        <MonetizationOnIcon/>
      </IconButton>
    </Grid>
    <List>
      {
        collectibleList.map(collectible => <Collectible
            key={collectible.name}
            collection={id}
            name={collectible.name}
            count={collectible.count}
            onUpArrowClick={() => {console.log("here"); collectiblesDispatcher({ type: 'updateCollectible', collection: id, name: collectible.name, count: collectible.count + 1})}}
            onDownArrowClick={() => collectiblesDispatcher({ type: 'updateCollectible', collection: id, name: collectible.name, count: collectible.count - 1})}/>)
      }
    </List>
  </Grid>
}

export default CollectibleList
