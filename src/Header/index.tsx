import React, { useState } from 'react';
import './style.scss';
import instagramLogo from '../assets/images/logo.png';
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsHeart,
  BsPlusCircle,
  BsPerson,
  BsPlusCircleFill,
  BsHeartFill,
  BsPersonFill,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface HeaderProps {}
// TODO: Make responsive for galaxy fold
// TODO: Add tests
const Header: React.FC<HeaderProps> = () => {
  interface HeaderLinkProps {
    Icon: IconType;
    ActiveIcon: IconType;
    to: string;
  }

  const HeaderLink: React.FC<HeaderLinkProps> = ({ Icon, ActiveIcon, to }) => {
    const size = 24;

    return (
      <>
        <NavLink
          exact
          to={to}
          className='header__link'
          activeClassName='header__link--hidden'
        >
          <Icon size={size} />
        </NavLink>

        <NavLink
          exact
          to={to}
          className='header__link header__link--hidden'
          activeClassName='header__link--active'
        >
          <ActiveIcon size={size} />
        </NavLink>
      </>
    );
  };

  return (
    <div className='header__page-padding'>
      <div className='header'>
        <div className='header__content-wrapper'>
          <img className='header__logo' src={instagramLogo} alt='Instagram' />

          <div className='header__links'>
            <HeaderLink
              Icon={BsHouseDoor}
              ActiveIcon={BsHouseDoorFill}
              to='/'
            />
            <HeaderLink
              Icon={BsPlusCircle}
              ActiveIcon={BsPlusCircleFill}
              to='/4'
            />
            <HeaderLink
              Icon={BsHeart}
              ActiveIcon={BsHeartFill}
              to='/suggestions'
            />
            <HeaderLink Icon={BsPerson} ActiveIcon={BsPersonFill} to='/4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
