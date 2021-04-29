import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import SignIn from "./components/Sign_in/SignIn";
import Register from "./components/register/Register";

const ParticlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

// clear up initialState on route change
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

const App = () => {
  const [state, setState] = useState(initialState);

  const loadUser = (userData) => {
    setState(() => ({
      ...state,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined,
      },
    }));
  };

  const faceLocation = (data) => {
    const detectedFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: detectedFace.left_col * width,
      topRow: detectedFace.top_row * height,
      rightCol: width - detectedFace.right_col * width,
      bottomRow: height - detectedFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setState({ ...state, box: box });
  };

  const onInputChange = (e) => {
    setState({ ...state, input: e.target.value });
  };

  const onSubmit = () => {
    setState({ ...state, imageUrl: state.input });
    fetch("https://image-detection-sv.herokuapp.com/imageURL", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: state.input,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp) {
          fetch("https://image-detection-sv.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: state.user.id,
            }),
          })
            .then((resp) => resp.json())
            .then((count) => {
              setState(Object.assign(state.user, { entries: count }));
            })
            .catch(console.log);
        }
        displayFaceBox(faceLocation(resp));
      })
      .catch((err) => console.log(`something is wrong err: ${err}`));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState({ ...state, isSignedIn: true });
    }
    setState({ ...state, route: route });
  };

  const { isSignedIn, imageUrl, route, box } = state;
  return (
    <div className="App">
      <Particles className="particles" params={ParticlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {state.route === "home" ? (
        <div>
          <Logo />
          <Rank name={state.user.name} entries={state.user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
};

export default App;
