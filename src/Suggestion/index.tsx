import React from 'react';
import { UserResponseDto } from '../common/api';
import Avatar from '../Avatar';

interface SuggestionProps {
  suggestion: UserResponseDto;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestion }) => {
  return (
    <div>
      <Avatar
        publicProfileImageId={suggestion.publicProfileImageId}
        widthInPx={44}
      />
      {suggestion.fullName} {suggestion.username}
    </div>
  );
};

export default Suggestion;
