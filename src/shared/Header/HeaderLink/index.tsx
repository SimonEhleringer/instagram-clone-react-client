import React from 'react';
import { IconType } from 'react-icons/lib';
import { NavLink, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

  const size = 24;
  const isActive = pathname === to;

  return (
    <NavLink
      data-testid={dataTestId}
      exact
      to={to}
      className='header-link'
      replace
    >
      {isActive ? <ActiveIcon size={size} /> : <Icon size={size} />}
    </NavLink>
  );
};

export default HeaderLink;
