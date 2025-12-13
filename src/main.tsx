import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//This code is the entry point that bootstraps your React application and mounts it to the DOM (Document Object Model). mounts a React component tree into the browser's actual DOM. This is the bridge between React's virtual DOM and the real DOM that users see in the browser
//The render() call is executed only once. When the browser loads your page, this code runs to set up the React application within the specified root element. After the initial mount, React automatically re-renders components when React components are updated due to state or prop change. So, React handles all subsequent updates through its virtual DOM diffing and reconciliation process—only updating the parts of the DOM that actually changed.
ReactDOM.createRoot(document.getElementById('root')!).render(//retrieves the HTML element with the id root from your index.html file, which is an empty <div id="root"></div> that serves as the container for your entire React app
  <React.StrictMode>                                        
    <App />
  </React.StrictMode>,
)
