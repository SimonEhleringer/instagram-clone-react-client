import React from 'react';
import { UserResponseDto } from '../common/api';
import Suggestion from '../Suggestion';
import './style.scss';

interface SuggestionsListProps {
  suggestions: UserResponseDto[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <div className='suggestions-list'>
      {suggestions.map((suggestion, index) => {
        return <Suggestion key={index} suggestion={suggestion} />;
      })}
    </div>
  );
};

export default SuggestionsList;
