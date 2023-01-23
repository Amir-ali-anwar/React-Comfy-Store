import React,{Profiler} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer,AuthWrapper } from './components'
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  // AuthWrapper,
} from './pages'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    console.log({id,phase,actualDuration,baseDuration,startTime,commitTime,interactions});
  }
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
        <AuthWrapper Showdata="1000">
        <Cart />
        </AuthWrapper>
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