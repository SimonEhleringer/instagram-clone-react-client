import React from 'react';
import {
  BsHeart,
  BsHeartFill,
  BsHouseDoor,
  BsHouseDoorFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs';
import instagramLogo from '../../assets/images/logo-header.png';
import {
  buildIndexPath,
  buildMyProfilePath,
  buildSuggestionsPath,
} from '../../routes/path';
import AddNewPostLink from './AddNewPostLink';
import HeaderLink from './HeaderLink';
import './style.scss';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className='header__page-padding'>
      <div className='header'>
        <div className='header__content-wrapper'>
          <img className='header__logo' src={instagramLogo} alt='Instagram' />

          <div className='header__links'>
            <HeaderLink
              Icon={BsHouseDoor}
              ActiveIcon={BsHouseDoorFill}
              to={buildIndexPath()}
              dataTestId='index-page-link'
            />

            <AddNewPostLink />

            <HeaderLink
              Icon={BsHeart}
              ActiveIcon={BsHeartFill}
              to={buildSuggestionsPath()}
              dataTestId='suggestions-page-link'
            />
            <HeaderLink
              Icon={BsPerson}
              ActiveIcon={BsPersonFill}
              to={buildMyProfilePath()}
              dataTestId='my-profile-page-link'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
