import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FacebookProvider from "react-facebook/module/FacebookProvider";
import LoginButton from "react-facebook/module/LoginButton";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isLoggedIn: false,
      userID: "",
      email: "",
      name: ""
    };
  }

  handleResponseFB = (data) => {
    console.log("logged");

    const user = {
      fbID: data.profile.id,
      username: data.profile.name,
      email: data.profile.email,

    };

    axios.post(`/api/auth/facebook`, user)
      .then(res => {
        //setredux state
        this.setState({
          isLoggedIn: true,
          name: data.profile.name,
          email: data.profile.email
        });
        if (res.status === 400) {
          console.log("already present in the database");
        }
      })
      .catch(err => console.log(err));



  };

  handleErrorFB = (error) => {
    this.setState({error});
  };

  render() {
    let LoginContent;

    if (this.state.isLoggedIn) {
      LoginContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <h2>You have been logged in {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      LoginContent = (
        <div>

          <h1>Please log in</h1>
          <FacebookProvider appId="350878788921352">
            <LoginButton
              scope="email"
              onCompleted={this.handleResponseFB}
              onError={this.handleErrorFB}
            >
              <span>Login via Facebook</span>
            </LoginButton>
          </FacebookProvider>
        </div>
      )
    }

    return <div>{LoginContent}</div>;

  }
}

export default Login;
