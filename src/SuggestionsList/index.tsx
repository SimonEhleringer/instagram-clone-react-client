import React from 'react';
import { SuggestionsResponseDto } from '../apiRequests';
import Suggestion from '../Suggestion';
import './style.scss';

interface SuggestionsListProps {
  suggestions: SuggestionsResponseDto;
  handleSuccessfulSubscription: () => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  handleSuccessfulSubscription,
}) => {
  return (
    <div className='suggestions-list'>
      {suggestions.suggestions.map((suggestion, index) => {
        return (
          <Suggestion
            key={index}
            suggestion={suggestion}
            handleSuccessfulSubscription={handleSuccessfulSubscription}
          />
        );
      })}
    </div>
  );
};

export default SuggestionsList;
