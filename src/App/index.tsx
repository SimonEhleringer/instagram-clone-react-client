import { CloudinaryContext } from 'cloudinary-react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/Routes';
import './style.scss';

// TODO: Delete unnessecary API endpoints
// TODO: Fix all warnings
// TODO: Clean up public folder
// TODO: New images, Instagram logo, favicon
const App = () => {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </CloudinaryContext>
  );
};

export default App;
