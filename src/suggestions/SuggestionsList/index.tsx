import React from 'react';
import { useDispatch } from 'react-redux';
import { UserResponseDto } from '../../api/meFollowed';
import { ButtonType } from '../../shared/Button';
import './style.scss';
import { loadSuggestions } from '../../redux/suggestions/slice';
import UserProfilePreview from '../../shared/ProfilePreview/UserProfilePreview';

interface SuggestionsListProps {
  suggestions: UserResponseDto[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  const dispatch = useDispatch();

  return (
    <div className='suggestions-list'>
      {suggestions.map((suggestion, index) => {
        return (
          <div className='suggestions-list__suggestion'>
            <UserProfilePreview
              key={index}
              user={suggestion}
              avatarSizeInPx={44}
              buttonType={ButtonType.PrimaryContained}
              handleSuccessfulSubscription={() => dispatch(loadSuggestions())}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionsList;
