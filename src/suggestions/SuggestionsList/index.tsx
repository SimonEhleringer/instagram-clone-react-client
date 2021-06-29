import React from 'react';
import { UserResponseDto } from '../../api/meFollowed';
import { ButtonType } from '../../shared/Button';
import './style.scss';
import UserProfilePreview from '../../shared/ProfilePreview/UserProfilePreview';
import ResponsiveHeading from '../../shared/ResponsiveHeading';

interface SuggestionsListProps {
  suggestions: UserResponseDto[];
  loadSuggestions: () => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  loadSuggestions,
}) => {
  return (
    <>
      <ResponsiveHeading>Vorschläge für dich</ResponsiveHeading>

      <div className='suggestions-list__content-wrapper'>
        {suggestions.map((suggestion, index) => {
          return (
            <div
              key={suggestion.userId}
              className='suggestions-list__suggestion'
            >
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
    </>
  );
};

export default SuggestionsList;
