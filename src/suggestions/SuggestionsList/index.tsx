import React from 'react';
import { UserResponseDto } from '../../api/shared-dtos';
import { ButtonType } from '../../shared/Button';
import UserProfilePreview from '../../shared/ProfilePreview/UserProfilePreview';
import './style.scss';

interface SuggestionsListProps {
  suggestions: UserResponseDto[];
  loadSuggestions: () => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  loadSuggestions,
}) => {
  return (
    <div className='suggestions-list'>
      {suggestions.map((suggestion, index) => {
        return (
          <div key={suggestion.userId} className='suggestions-list__suggestion'>
            <UserProfilePreview
              key={index}
              user={suggestion}
              avatarSizeInPx={44}
              buttonType={ButtonType.PrimaryContained}
              handleSuccessfulSubscription={() => loadSuggestions()}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionsList;
