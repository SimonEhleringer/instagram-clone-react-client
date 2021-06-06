import React from 'react';
import { addFollow, UserResponseDto } from '../common/api';
import Avatar from '../Avatar';
import Button from '../Button';
import { Link } from 'react-router-dom';
import './style.scss';

interface SuggestionProps {
  suggestion: UserResponseDto;
  handleSuccessfulSubscription: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({
  suggestion,
  handleSuccessfulSubscription,
}) => {
  const { userId, fullName, username, publicProfileImageId } = suggestion;

  const handleSubscribe = async (userIdToSubscribeTo: string) => {
    await addFollow(userIdToSubscribeTo);

    handleSuccessfulSubscription();
  };

  return (
    <div className='suggestion'>
      <Avatar publicProfileImageId={publicProfileImageId} widthInPx={44} />

      {/* TODO: Change route for link */}
      <div className='suggestion__user-information'>
        <Link to='/' className='suggestion__username'>
          {username}
        </Link>

        <div className='suggestion__full-name'>{fullName}</div>
      </div>

      <div className='suggestion__button'>
        <Button
          loading={true}
          htmlInputProps={{
            onClick: () => handleSubscribe(userId),
          }}
        >
          Abonnieren
        </Button>
      </div>
    </div>
  );
};

export default Suggestion;
