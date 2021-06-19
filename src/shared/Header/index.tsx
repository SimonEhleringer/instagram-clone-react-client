import React from 'react';
import './style.scss';
import instagramLogo from '../../assets/images/logo.png';
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsHeart,
  BsPerson,
  BsHeartFill,
  BsPersonFill,
} from 'react-icons/bs';
import HeaderLink from './HeaderLink';
import AddNewPostLink from './AddNewPostLink';
import {
  buildIndexPath,
  buildMyProfilePath,
  buildSuggestionsPath,
} from '../../routes';

interface HeaderProps {}
// TODO: Add tests (Maybe add tests with integration for App component)
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
            />

            <AddNewPostLink />

            <HeaderLink
              Icon={BsHeart}
              ActiveIcon={BsHeartFill}
              to={buildSuggestionsPath()}
            />
            <HeaderLink
              Icon={BsPerson}
              ActiveIcon={BsPersonFill}
              to={buildMyProfilePath()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
