import { CloudinaryContext } from "cloudinary-react";
import React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "../routes/Routes";
import "./style.scss";

// TODO: public folder
const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <HashRouter basename="/">
        <Routes />
      </HashRouter>
    </CloudinaryContext>
  );
};

export default App;
