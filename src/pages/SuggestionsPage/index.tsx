import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { getSuggestions } from '../../apiRequests';
import AppLayout from '../../AppLayout';

const SuggestionsPage: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    getSuggestions().then(
      (value) => console.log(value.data),
      (error) => console.log(error)
    );
  }, []);

  return <AppLayout>suggestions</AppLayout>;
};

export default SuggestionsPage;
