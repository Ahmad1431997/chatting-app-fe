//style
import './App.css';


import { Route } from 'react-router';

//components
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Home from './components/home/Home';


function App() {
  return (
   
    <div style={{height:"700px"}} className="container">
        <div className="row">

<div style={{marginTop:"50px"}} className="col-8">
  <Route path="/">
  <Home/>
  
  </Route>
</div>
</div>
      <div className="row">

    <div className="col-md-3 offset-md-8">
      <Route path="/signin">
        
      <Signin />
        
      </Route>
      </div>
    </div>
    <div className="row">

    <div className="col-md-3 offset-md-8">

      <Route path="/signup">
      <Signup/>
      </Route>
    </div>
    </div>
      
  
    </div>
   
  );
}

export default App;
