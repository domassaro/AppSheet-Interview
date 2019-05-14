import React from 'react';
import '../styles/App.css';
import searchIcon from '../icons/searchIcon.svg';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results,
      filtered: this.props.results,
      isLoaded: false,
      searchTerm: null
    };
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    this.setState ({
      filtered: this.props.results,
      isLoaded: true
    });
  }  

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(oldProps.results !== newProps.results) {
      this.setState({ 
        filtered: this.props.results,
        results: this.props.results,
       })
    }
  }

  /* Profiles without working images will get default image */
  addDefaultSrc(ev){
    ev.target.src = 'https://i.stack.imgur.com/l60Hf.png'
  }

  search(event) {	
    let results = [];	
    let searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      results = this.props.results.filter(result => {	
        return result.name.startsWith(event.target.value);	
      });
      this.setState({
        filtered: results
      });
    } else {
      this.setState({
        filtered: this.props.results
      });
    }
  }

  render() {
    const { error, isLoaded, results, filtered } = this.state;
    /* Profiles without valid U.S. phone numbers should not be displayed */
    const filteredResults = filtered.filter(r => (r.number.replace(/[^\d]/g, "")).length === 10 );
    return (
      <div className="search-bar-container">
        <style jsx>{`
        
        `}</style>
        <form onSubmit={this.submit} method="get" autoComplete="off">
          <input
            id="search-bar"
            type="text"
            name="q"
            placeholder={"Who are you looking for?"}
            onChange={this.search}
          />
          <button
            type="submit"
            value="Submit"
            disabled={!this.state.searchTerm || this.state.searchTerm.length == 0} >
            <div className="search-icon">
              <img src={searchIcon} />
            </div>
          </button>
        </form>
        <div className="container">
        {!isLoaded && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
          {isLoaded && !error && filteredResults.map(result => (<div key={result} className="profile-container">
            {<div className="flip-card-inner">
              <div className="flip-card-front">
                <img onError={this.addDefaultSrc} src={result.photo} width="250px" height="250px" alt="Photo" />
                <div className="text-container">
                  <h2>{result.name.toUpperCase()}, {result.age}</h2>
                  <p className="number-container">{result.number}</p>
                </div>
              </div>
              <div className="flip-card-back">
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