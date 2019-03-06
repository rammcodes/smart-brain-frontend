import React, { Component } from "react";
import "./sign_in.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    const { value } = event.target;
    this.setState({ signInEmail: value });
  };

  onPasswordChange = event => {
    const { value } = event.target;
    this.setState({ signInPassword: value });
  };

  onSubmit = () => {
    const { signInEmail, signInPassword } = this.state;
    const { onRouteChange, loadUser } = this.props;
    fetch("https://obscure-ocean-76689.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    const { onEmailChange, onPasswordChange, onSubmit } = this;
    return (
      <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label
                  className="db bold fw6 lh-copy f6"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db bold fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 bold input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={onSubmit}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                href="#0"
                className="f6 bold pointer link dim black db"
                onClick={() => onRouteChange("register")}
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
