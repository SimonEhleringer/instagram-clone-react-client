import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserResponseDto } from '../common/api';
import { ReduxState } from '../config/store';
import { loadSuggestions } from '../slice';
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
