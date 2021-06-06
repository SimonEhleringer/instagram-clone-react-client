import React from 'react';
import { UserResponseDto } from '../common/api';
import Avatar from '../Avatar';
import Button from '../Button';
import { Link } from 'react-router-dom';
import './style.scss';

interface SuggestionProps {
  suggestion: UserResponseDto;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestion }) => {
  const { userId, fullName, username, publicProfileImageId } = suggestion;

  return (
    <div className='suggestion'>
      <Avatar publicProfileImageId={publicProfileImageId} widthInPx={44} />

      <div className='suggestion__user-information'>
        <Link to='/' className='suggestion__username'>
          {username}
        </Link>

        <div className='suggestion__full-name'>{fullName}</div>
      </div>

      <div className='suggestion__button'>
        <Button>Abonnieren</Button>
      </div>
    </div>
  );
};

export default Suggestion;
