import React from 'react';
import { IconType } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import './style.scss';

export interface HeaderLinkProps {
  Icon: IconType;
  ActiveIcon: IconType;
  to: string;
  dataTestId: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({
  Icon,
  ActiveIcon,
  to,
  dataTestId,
}) => {
  const size = 24;

  return (
    <div data-testid={dataTestId}>
      <NavLink
        data-testid='normalLink'
        exact
        to={to}
        className='header-link'
        activeClassName='header-link--hidden'
      >
        <Icon size={size} />
      </NavLink>

      <NavLink
        data-testid='activeLink'
        exact
        to={to}
        className='header-link header-link--hidden'
        activeClassName='header-link--active'
      >
        <ActiveIcon size={size} />
      </NavLink>
    </div>
  );
};

export default HeaderLink;
