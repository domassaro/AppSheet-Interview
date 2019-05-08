import React from 'react';
import './App.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
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

  render() {
    const { error, isLoaded, result } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {result.name}
        </ul>
      );
    }
  }
}

export default Profile;
