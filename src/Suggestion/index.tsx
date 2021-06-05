import React from 'react';
import { UserResponseDto } from '../common/api';

interface SuggestionProps {
  suggestion: UserResponseDto;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestion }) => {
  return (
    <div>
      {suggestion.fullName} {suggestion.username}
    </div>
  );
};

export default Suggestion;
