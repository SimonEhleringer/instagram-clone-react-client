import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { getSuggestions, SuggestionsResponseDto } from '../../apiRequests';
import AppLayout from '../../AppLayout';
import SuggestionsList from '../../SuggestionsList';

const SuggestionsPage: React.FC<RouteComponentProps> = () => {
  const [suggestions, setSuggestions] =
    useState<SuggestionsResponseDto | undefined>(undefined);

  useEffect(() => {
    getSuggestions().then((value) => setSuggestions(value.data));
  }, []);

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  return (
    <AppLayout>
      {suggestions && <SuggestionsList suggestions={suggestions} />}
    </AppLayout>
  );
};

export default SuggestionsPage;
