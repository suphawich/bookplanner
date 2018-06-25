import React from 'react';
import '../css/bookplannerheader.css';

class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  greeting() {
    if (this.props.account.user == null) {
      return (
        <button onClick={this.props.account.login}>Log in</button>
      )
    } else {
      return (
        <div>
          <img src={this.props.account.user.photoURL} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label={this.props.account.user.displayName}/>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" onClick={this.props.account.logout}>Log out</a>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="_account ml-auto">
        {this.greeting()}
      </div>
    );
  }
}

class Banner extends React.Component {
  render() {
    return (
      <div className="_logo"></div>
    );
  }
}

class BookPlannerHeader extends React.Component {
  render() {
    return (
      <div className="_root d-flex flex-row">
        <Banner />
        <Account account={this.props.account} />
      </div>
    );
  }
}

export default BookPlannerHeader;