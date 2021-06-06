import React, { useState } from 'react';
import './style.scss';
import instagramLogo from '../assets/images/logo.png';
import { BsHouseDoor, BsHeart, BsPlusCircle, BsPerson } from 'react-icons/bs';
import {
  MdAddCircle,
  MdAddCircleOutline,
  MdFavorite,
  MdFavoriteBorder,
} from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface HeaderProps {}
// TODO: Make responsive for galaxy fold
// TODO: Add tests
const Header: React.FC<HeaderProps> = () => {
  interface HeaderLinkProps {
    Icon: IconType;
    to: string;
  }

  const HeaderLink: React.FC<HeaderLinkProps> = ({ Icon, to }) => {
    return (
      <NavLink to={to} className='header__link'>
        <Icon size={24} />
      </NavLink>
    );
  };

  return (
    <div className='header__page-padding'>
      <div className='header'>
        <div className='header__content-wrapper'>
          <img className='header__logo' src={instagramLogo} alt='Instagram' />

          <div className='header__links'>
            <HeaderLink Icon={BsHouseDoor} to='/' />
            <HeaderLink Icon={BsPlusCircle} to='/4' />
            <HeaderLink Icon={BsHeart} to='/suggestions' />
            <HeaderLink Icon={BsPerson} to='/4' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
