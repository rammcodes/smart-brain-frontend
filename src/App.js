import React, { Component } from "react";
import Navigation from "./components/navigation/navigation";
import ImageLinkForm from "./components/image_link_form/image_link_form";
import Rank from "./components/rank/rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/face_recognition/face-recognition";
import SignIn from "./components/sign_in/sign_in";
import Register from "./components/register/register";
import "./App.css";

const initialState = {
  input: "",
  imageUrl: "",
  box: false,
  route: "signIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const { left_col, right_col, top_row, bottom_row } = clarifaiFace;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    this.setState({
      box: {
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - right_col * width,
        bottomRow: height - bottom_row * height
      }
    });
  };

  onInputChange = event => {
    const { value } = event.target;
    this.setState({ input: value });
  };

  onRouteChange = route => {
    if (route === "signIn") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  onSubmit = () => {
    const { input, user } = this.state;
    const { calculateFaceLocation } = this;
    this.setState({ imageUrl: input });
    fetch("https://obscure-ocean-76689.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://obscure-ocean-76689.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(user, { entries: count }));
            })
            .catch(err => console.log(err));
        }
        calculateFaceLocation(response);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { onInputChange, onSubmit, onRouteChange, loadUser } = this;
    const { imageUrl, box, route, isSignedIn } = this.state;
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        {route === "home" ? (
          <div>
            <Rank name={name} entries={entries} />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) : route === "signIn" ? (
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
        ) : (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
