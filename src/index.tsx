import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss"

var originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  var event = new Event('itemInserted');

  originalSetItem.apply(this, [key, value]);
  
  document.dispatchEvent(event);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
