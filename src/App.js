import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
} from './pages'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
    <Navbar />
    {/* <Sidebar /> */}
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route exact path='/products'>
        <Products />
      </Route>
      <Route path='/products/:ProductId' children={<SingleProduct />}/>
        <Route path='*'>
        <Error />
      </Route>
    </Switch>
    <ToastContainer position="top-center"  limit={1}/>
    <Footer />
  </Router>
  )
}

export default App