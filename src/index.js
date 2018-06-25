import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import BookPlannerHeader from './components/bookplannerheader';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDXJYtKwxKv3XCtB0JqF-maV0Gulq4x0rs",
  authDomain: "bookplanner-c2569.firebaseapp.com",
  databaseURL: "https://bookplanner-c2569.firebaseio.com",
  projectId: "bookplanner-c2569",
  storageBucket: "bookplanner-c2569.appspot.com",
  messagingSenderId: "161373974176"
};
firebase.initializeApp(config);
const auth = firebase.auth
const provider = new firebase.auth.FacebookAuthProvider()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null}
  }

  login = () => {
    var that = this;
    const result = auth().signInWithPopup(provider).then(function(result) {
      var user = result.user;
      console.log(user);
      that.setState({user: user, login: true});
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    // alert("h")
  }

  logout = () => {
    var that = this;
    auth().signOut().then(function () {
      that.setState({ user: null , login: false})
    }).catch(function (error) {
    });
  }

  renderName = () => {
    const { user } = this.state
    if (user)
      return (
        <img src={`${user.photoURL}`} aria-label={`${user.displayName}`}/>
      );
  }

  componentDidMount() {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (that.state.user == null && user) {
        that.setState({user: user})
      }
    });
  }
  
  render() {
    const account = {
      login: this.login,
      logout: this.logout,
      user: this.state.user,
      renderName: this.renderName
    }

    return (
      <div className="App">
        <BookPlannerHeader account={account} />
        {this.renderName()}
        <button onClick={this.login}>
          Login with Facebook
        </button>
        <button onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);