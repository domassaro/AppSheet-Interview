import React from 'react';
import './App.css';
import searchIcon from './searchIcon.svg';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://appsheettest1.azurewebsites.net/sample/detail/2")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  search(event) {	
    let results = [];	
    results.filter(result => {	
      return result.name.startsWith(event.target.value);	
    })	
  }

  render() {
    const { error, isLoaded, result } = this.state;
      return (
        <div className="search-bar-container">
          <style jsx>{`
            .search-bar-container {
              position: relative;
              width: 100%;
              margin: 0 auto;
            }
            input::placeholder {
              color: #9b9b9b;
              font-family: "Fira Sans", sans-serif;
            }
            input {
              color: #4a4a4a;
              font-family: "Fira Sans", sans-serif;
            }
            input:focus {
              outline: none;
            }
            #search-bar {
              width: 100%;
              height: 38px;
              padding: 15px 10px;
              font-size: 14px;
              border-radius: 2px;
              letter-spacing: 0;
            }
            button[type="submit"]:hover {
              background-color: #578c31;
            }
            button[type="submit"] {
              border: none;
              position: absolute;
              top: 0;
              right: 0;
              width: 38px;
              height: 38px;
              border-radius: 0 2px 2px 0;
              background-color: #77be43;
              line-height: 42px;
              text-align: center;
            }
            .search-icon img {
              width: 16px;
              position: relative;
              top: 2px;
              border-top-right-radius: 2px;
              border-bottom-right-radius: 2px;
            }
            @media screen and (min-width: 1025px) {
              #search-bar {
                height: 20px;
                font-size: 18px;
                padding: 25px 30px;
              }
              button[type="submit"] {
                width: 52px;
                height: 52px;
                line-height: 64px;
              }
              .search-icon img {
                width: 22px;
              }
            }
          `}</style>
          <form onSubmit={this.submit} method="get" autoComplete="off">
            <input
              id="search-bar"
              type="text"
              name="q"
              defaultValue={this.props.queryTerm || ""}
              placeholder={"Who are you looking for?"}
              onChange={this.search}
              // onFocus={() => this.props.toggleResultView(true)}
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
        </div>
      );
  }
}


export default SearchBar;
