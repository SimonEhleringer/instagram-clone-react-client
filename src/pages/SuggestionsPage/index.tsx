import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { getSuggestions, SuggestionsResponseDto } from '../../apiRequests';
import AppLayout from '../../AppLayout';
import SuggestionsList from '../../SuggestionsList';
import './style.scss';

const SuggestionsPage: React.FC<RouteComponentProps> = () => {
  const [suggestions, setSuggestions] =
    useState<SuggestionsResponseDto | undefined>(undefined);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = () => {
    getSuggestions().then((value) => setSuggestions(value.data));
  };

  return (
    <AppLayout>
      {suggestions && (
        <div className='suggestions-page__layout'>
          <div className='suggestions-page__wrapper'>
            <h1 className='suggestions-page__heading'>Vorschläge für dich</h1>

            <SuggestionsList
              suggestions={suggestions}
              handleSuccessfulSubscription={loadSuggestions}
            />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default SuggestionsPage;
