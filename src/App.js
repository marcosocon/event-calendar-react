import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Calendar from './domains/Calendar/Container'
import { getStore } from './redux/store'
import './App.css';

const store = getStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Calendar />
        </div>
      </Provider>
    );
  }
}

export default App;
