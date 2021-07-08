import resourceApi from '../config/resource-api';
import { UserResponseDto } from './shared-dtos';

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
