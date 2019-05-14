import React, { Component } from 'react';
import * as mobxReact from 'mobx-react';
import './styles/App.css';
import Profile from './components/profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  async fetchProfiles() {
    let results = await this.fetchAllResults();
    let profiles = [];
    for (let i = 0; i < results.length; i++) {
      let profile = await this.fetchProfile(results[i]);
      if (profile) {
        profiles.push(profile);
      }
    }
    return profiles;
  }

  async fetchProfile(profileId) {
    let url = `https://appsheettest1.azurewebsites.net/sample/detail/${profileId}`;
    return await fetch(url)
      .then(res => res.json())
      .then((res) => {
        return res;
      },
      (error) => {
        return null;
      });
  }

  async fetchAllResults() {
    let url = 'https://appsheettest1.azurewebsites.net/sample/list';
    let response = null;
    let results = [];
    do {
        response = await fetch(url)
        .then(res => res.json())
        .then((res) => {
            return res;
        });
        results = results.concat(response.result);
        if (response.token) {
            let newUrl = new URL(url);
            newUrl.searchParams.set('token', response.token)
            url = newUrl.toString();
        }
    } while (response.token);
    return results;
  }

  async componentDidMount() {
    this.setState ({
      results: await this.fetchProfiles(),
      isLoaded: true
    });
  }  

  render() {
    return (
      <div>
        <style jsx>{`
          .container {
            height: 100%;
            overflow: hidden;
            max-width: 80%;
            margin: 20px auto;
          }
        `}</style>
        <div className="container">
          <Profile 
            results={this.state.results}/>
        </div>
      </div>
    );
  }
}

var ObservableApp = mobxReact.observer(App);
export default ObservableApp;
