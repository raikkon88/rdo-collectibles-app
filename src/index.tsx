import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CollectiblesContext from './context/CollectiblesContext'

ReactDOM.render(
  <React.StrictMode>
    <CollectiblesContext>
      <App />
    </CollectiblesContext>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
