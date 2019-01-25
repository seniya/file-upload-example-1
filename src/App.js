import React, { Component } from 'react';
import './App.css';


import BlogCreate from './pages/BlogCreate'
import BlogList from './pages/BlogList';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const stylesApp = {
  marginTop : '40px'
}

class App extends Component {
  render() {
    return (
      <div className="container">      
        <div className="row" style= { stylesApp }>
          <div className="col-md-6">
            <BlogCreate />
          </div>
          <div className="col-md-6">
            <BlogList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
