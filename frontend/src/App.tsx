import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ReviewContainer from './components/ReviewContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <ErrorBoundary>
            <ReviewContainer />
          </ErrorBoundary>
        </Layout>
      </div>
    );
  }
}

export default App;
