import React from "react";
import "./LoginPage.scss";
import instagramLogo from "../instagram-logo.png";

const LoginPage = () => {
  return (
    // <div className='login-form-wrapper'>
    //   <div className='login-form'>
    //     <div className='login-form__box'>
    //       <img src={instagramLogo} alt='Instagram' />
    //       <input />
    //       <input />
    //     </div>
    //   </div>

    //   <div className='login-form__box'>Du hast kein Konto? Registrieren</div>
    // </div>
    <div className="login-form-wrapper">
      <div className="login-form">
        <div className="login-form__box">
          <img
            className="login-form__logo"
            src={instagramLogo}
            alt="Instagram"
          />

          <div className="login-form__content-wrapper">
            <input></input>
            <input></input>
            <div className="login-form__button-wrapper">
              <button className="login-form__button">Anmelden</button>
            </div>
          </div>
        </div>

        <div className="login-form__box">Du hast kein Konto? Registrieren</div>
      </div>
    </div>
  );
};

export default LoginPage;
