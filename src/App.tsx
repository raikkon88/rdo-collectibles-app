import React from 'react';
import './App.css';
import {Container, Grid } from '@material-ui/core';

import Header from './components/header'
import CollectibleList from './components/CollectibleList'
import {CollectiblesContext, CollectiblesDispatcher} from './context/CollectiblesContext'
import CollectionMenu from './components/collectionMenu';
import {CollectionMenuItemParams} from './components/collectionMenu/item'

function App() {
  
  const {collectibles} = React.useContext(CollectiblesContext)
  const {collectiblesDispatcher} = React.useContext(CollectiblesDispatcher)
  const [selectedCollectible, setSelectedCollectible] = React.useState<string>()

  const exportCollectibles = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(collectibles)], {type:'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "collectibles.json";
    document.body.appendChild(element);
    element.click();
  }

  const importCollectibles = () => {

    const readFile = (element:any) => {
      if(element && element.files && element.files.length > 0) {
        let file = element.files[0]
        const reader = new FileReader()
        reader.onload = () => {
          if(reader.result){
            console.log('loaded', reader.result)
            collectiblesDispatcher({type: 'import', collectibles: JSON.parse(reader.result as string)})
          }
        }
        reader.readAsText(file)
      }
    }

    let input = document.createElement('input')
    input.setAttribute("type", "file")
    input.addEventListener("change", (event) => readFile(event.target))
    input.click()
  }

  return (
      <Container maxWidth='xl'>
        <Grid>
          <Header 
            onImport={importCollectibles}
            onExport={exportCollectibles}/>
          <Grid container direction="row">
            {
              collectibles && <CollectionMenu
                items={Object.keys(collectibles).map((key:string) => { 
                  return ({
                    name: collectibles[key].name,
                    onClick: () => setSelectedCollectible(key),
                    fullWidth: true
                } as CollectionMenuItemParams)})}
                />
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
