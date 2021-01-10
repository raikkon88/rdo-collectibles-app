import React from 'react';
import './App.css';
import {Container, Grid, Typography, Button } from '@material-ui/core';

import CollectibleList from './components/CollectibleList'
import {CollectiblesContext} from './context/CollectiblesContext'

function App() {
  
  const {collectibles} = React.useContext(CollectiblesContext)
  const [selectedCollectible, setSelectedCollectible] = React.useState<string>()

  return (
      <Container maxWidth='xl'>
        <Grid>
          <Typography variant={'h2'}>
            Collectibles
          </Typography>
          <Grid container direction="row">
            {
              collectibles && Object.keys(collectibles).map((key:string) => <Button variant='contained' color="primary" key={`button-${collectibles[key].name}`} onClick={() => setSelectedCollectible(key)}>{collectibles[key].name}</Button>)
            }
          </Grid>
          { selectedCollectible &&
            <CollectibleList id={selectedCollectible} name={collectibles[selectedCollectible].name} collectibleList={collectibles[selectedCollectible].collectibleList}></CollectibleList>
          }
        </Grid>
      </Container >
  );
}

export default App;
