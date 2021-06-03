import { UserResponseDto } from './common/api';
import resourceApi from './config/resourceApi';

export const getSuggestions = async () => {
  const response = await resourceApi.get<SuggestionsResponseDto>(
    'me/suggestions',
    {}
  );

  return response;
};

export interface SuggestionsResponseDto {
  suggestions: UserResponseDto[];
}
