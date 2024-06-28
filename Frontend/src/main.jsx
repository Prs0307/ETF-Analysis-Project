import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import Home from './components/Home/Home'
import Chart from './components/Contact/Contact'
// import Chart from './components/Contact/Contact'
import About from './components/About/About'
// import About from './components/About/About'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import EtfDetails from './components/ETFAnalysis/EtfDetails'
// import App from './App.jsx'
const router =createBrowserRouter(
  [
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:"",
          element:<Home/>,
         
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/contact",
          element:<Chart/>
        },
        {
          path:"/etfdetails/:id",
          element:<EtfDetails/>
        },
        
      ]

    }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} /> 

{/* it takes only Routes */}
</React.StrictMode>,
)
