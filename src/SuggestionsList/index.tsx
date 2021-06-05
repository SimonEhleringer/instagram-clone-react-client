import React from 'react';
import { SuggestionsResponseDto } from '../apiRequests';
import Suggestion from '../Suggestion';

interface SuggestionsListProps {
  suggestions: SuggestionsResponseDto;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <div>
      {suggestions.suggestions.map((suggestion, index) => {
        return <Suggestion suggestion={suggestion} />;
      })}
    </div>
  );
};

export default SuggestionsList;
