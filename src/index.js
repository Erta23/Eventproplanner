import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';



import "./index.css";
import App from "./App";

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
   
         <App />
    
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);