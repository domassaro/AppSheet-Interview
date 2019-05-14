import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import * as mobxReact from 'mobx-react';
import './App.css';
import SearchBar from './components/searchBar';
import Profile from './components/profile';
import ResultStore from "./components/stores/results";

class App extends Component {
  constructor(props) {
    super(props);
    this.resultStore = new ResultStore();
  }
  render() {
    return (
      <Provider ResultStore ={this.resultStore}>
        <div>
          <style jsx>{`
            .container {
              height: 100%;              
            }
            .search-bar-wrapper {
              overflow: hidden;
              max-width: 80%;
              margin: 20px auto;
            }
          `}</style>

          <div className="container">
            {/* <div className="color-content">
              {this.colorStore.getCurrentColor() && 
              <DetailView clear={this.clearColor} 
                color={this.colorStore.getCurrentColor()}/>}
            </div> */}
              <div className="search-bar-wrapper">
                <SearchBar/>

              </div>
              <Profile />
          </div>
        </div>
      </Provider>
    );
  }
}

var ObservableApp = mobxReact.observer(App);
export default ObservableApp;
