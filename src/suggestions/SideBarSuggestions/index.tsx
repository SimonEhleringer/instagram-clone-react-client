import React from 'react';
import { Link } from 'react-router-dom';
import { UserResponseDto } from '../../api/shared-dtos';
import { buildSuggestionsPath } from '../../routes/path';
import { ButtonType } from '../../shared/Button';
import UserProfilePreview from '../../shared/ProfilePreview/UserProfilePreview';
import './style.scss';

export interface SideBarSuggestionsProps {
  suggestions: UserResponseDto[];
  loadSuggestions: () => Promise<void>;
}

const SideBarSuggestions: React.FC<SideBarSuggestionsProps> = ({
  suggestions,
  loadSuggestions,
}) => {
  return (
    <div>
      <div className='side-bar-suggestions__heading'>
        <span className='side-bar-suggestions__heading-text'>
          Vorschläge für dich
        </span>
        <Link
          className='side-bar-suggestions__all-suggestions-link'
          to={buildSuggestionsPath()}
        >
          Alle ansehen
        </Link>
      </div>
      <div className='side-bar-suggestions__suggestions'>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.userId}
            className='side-bar-suggestions__suggestion'
          >
            <UserProfilePreview
              user={suggestion}
              avatarSizeInPx={32}
              buttonType={ButtonType.PrimaryText}
              handleSuccessfulSubscription={loadSuggestions}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarSuggestions;
