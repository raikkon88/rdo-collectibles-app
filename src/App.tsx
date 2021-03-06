import React from 'react';
import './App.css';
import {Container, Grid } from '@material-ui/core';

import Header from './components/header'
import CollectibleList from './components/CollectibleList'
import {CollectiblesContext, CollectiblesDispatcher} from './context/CollectiblesContext'
import CollectionMenu from './components/collectionMenu';
import {CollectionMenuItemParams} from './components/collectionMenu/item'
import { CollectibleParams } from './components/Collectible';

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
            // console.log('loaded', reader.result)
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

  const getMenuItems = React.useMemo<CollectionMenuItemParams[]>(() => {

    const sortFunc = (a:string, b:string) => {
      let aName = collectibles[a].name;
      let bName = collectibles[b].name;
      return aName < bName ? -1 : aName > bName ? 1 : 0
    }

    return Object.keys(collectibles).sort(sortFunc).map((key:string) => { 
      return ({
        name: collectibles[key].name,
        length: collectibles[key].collectibleList.length,
        count: collectibles[key].collectibleList.filter((collectible: CollectibleParams) => collectible.count > 0).length,
        onClick: () => setSelectedCollectible(key),
        fullWidth: true
    } as CollectionMenuItemParams)})
  }, [collectibles])

  return (
      <Container maxWidth='xl'>
        <Grid>
          <Header 
            onImport={importCollectibles}
            onExport={exportCollectibles}/>
          <Grid container direction="row">
            {
              collectibles && <CollectionMenu
                items={getMenuItems}
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
