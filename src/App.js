import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { Navbar, Sidebar, Footer } from './components'
import Home from './pages/HomePage'
// import {
//   Home,
//   SingleProduct,
//   Cart,
//   Checkout,
//   Error,
//   About,
//   Products,
//   PrivateRoute,
//   AuthWrapper,
// } from './pages'
function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
      <Switch>
       <Route path='/'>
       <Home />
       </Route>
      </Switch>
    </Router>
  )
}

export default App