import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/mainPage';
import './App.css';
import Navigation from './components/navigation';
import AddNew from './components/addNew';

class App extends React.Component{
  
  render(){
    return (
      <div className="App">
        <Router>
        <Navigation />

          <Route path="/home" component={MainPage} />
          <Route path="/add" component={() => 
            <AddNew/>
          } />
        </Router>
        
       
      </div>
    );
  }
  
}
export default App;
