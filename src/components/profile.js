import React from 'react';
import '../App.css';

class Profile extends React.Component {
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
    const { error, isLoaded, results } = this.state;
    /* Profiles without valid U.S. phone numbers should not be displayed */
    const filteredResults = results.filter(r => r.number.length > 4 );
    return (
      <div>
        <style jsx>{`
          @keyframes slideInFromLeft {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }
          .container {
            padding-top: 20px;
            padding-bottom: 20px;
            text-align: center;
          }
          .profile-container {
            animation: 1.4s ease-out 0s 1 slideInFromLeft;
            position: relative;
            -webkit-box-shadow: 0 5px 10px 0 rgba(0,0,0,0.05);
            box-shadow: 0 5px 10px 0 rgba(0,0,0,0.05);
            overflow: hidden;
            width: 250px;
            padding: 15px;
            background-color: white;
            height: 100%;
            margin: 10px;
            display: inline-block;
          }
          h2, p {
            text-transform: uppercase;
            font-weight: normal;
            font-size: 13px;
            line-height: 20px;
            color: #000;
            letter-spacing: 1.5px;
            margin: 0;
            padding: 0;
          }
          .bio-text {
            font-size: 13px;
          }
        `}</style>
        <div className="container">
        {!isLoaded && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
          {isLoaded && !error && filteredResults.map(result => (<div key={result} className="profile-container">
          {<div>
                <img src={result.photo} width="150" height="150" alt="Photo" />
                <div className="info-wrapper">
                  <h2>{result.name.toUpperCase()}</h2>
                  <p>{result.age}</p>
                  <p>{result.number}</p>
                  <div className="bio-text">
                    {result.bio}
                  </div>
                </div>
              </div>}
            </div>))}
        </div>
      </div>
    );
  }
}

export default Profile;