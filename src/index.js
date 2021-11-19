import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
