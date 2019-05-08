import React from 'react';
import './App.css';
import Profile from './profile';

class SearchBar extends React.Component {
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
    console.log(profileId);
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


  search(text) {
    let results = [];
    results.filter(result => {
        return result.name.startsWith(text);
    })
}



  render() {
    const { error, isLoaded, results } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {results.map(function(result){
          return <p>{result.name}</p>         
        })
      }
        </div>
      );
    }
  }
}

export default SearchBar;
