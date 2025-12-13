import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//This code is the entry point that bootstraps your React application and mounts it to the DOM (Document Object Model). mounts a React component tree into the browser's actual DOM. This is the bridge between React's virtual DOM and the real DOM that users see in the browser
ReactDOM.createRoot(document.getElementById('root')!).render(//retrieves the HTML element with the id root from your index.html file, which is an empty <div id="root"></div> that serves as the container for your entire React app
  <React.StrictMode>                                        
    <App />
  </React.StrictMode>,
)
