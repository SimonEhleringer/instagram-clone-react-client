import { UserResponseDto } from './meFollowed';
import resourceApi from '../config/resourceApi';

export const getSuggestions = async () => {
  const response = await resourceApi.get<SuggestionsResponseDto>(
    buildGetSuggestionsUrl()
  );

  return response;
};

export const buildGetSuggestionsUrl = () => '/me/suggestions';

export interface SuggestionsResponseDto {
  suggestions: UserResponseDto[];
}
