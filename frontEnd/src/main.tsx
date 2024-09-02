import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MealsProvider } from './api/context api/meals.tsx'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
  

    <MealsProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MealsProvider>,
  
)
