import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Assignment from './Assignment.jsx'
import AddProduct from './AddProduct.jsx'
import Registration from './registration.jsx'
import ProductList from './ProductList.jsx'

function Home() {
  const [listVersion, setListVersion] = useState(0)

  return (
    <>
      {/*
      <App />
      <Assignment />*/}
      <AddProduct onProductAdded={() => setListVersion((version) => version + 1)} />
      <ProductList refreshKey={listVersion} />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
