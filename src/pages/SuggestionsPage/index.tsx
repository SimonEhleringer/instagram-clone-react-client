import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import PageLoader from "../../shared/PageLoader";
import SuggestionsList from "../../suggestions/SuggestionsList";
import SlimPageLayout from "../../shared/SlimPageLayout";

import { UserResponseDto } from "../../api/meFollowed";
import { getSuggestions } from "../../api/meSuggestions";
import ResponsiveHeading from "../../shared/ResponsiveHeading";

const SuggestionsPage: React.FC<RouteComponentProps> = () => {
  const [suggestions, setSuggestions] = useState<UserResponseDto[] | undefined>(
    undefined
  );

  const loadSuggestions = useCallback(() => {
    getSuggestions().then((val) => setSuggestions(val.data.suggestions));
  }, []);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  return (
    <>
      {!suggestions ? (
        <PageLoader />
      ) : (
        <SlimPageLayout>
          <ResponsiveHeading>Vorschläge für dich</ResponsiveHeading>

          <SuggestionsList
            suggestions={suggestions}
            loadSuggestions={loadSuggestions}
          />
        </SlimPageLayout>
      )}
    </>
  );
};

export default SuggestionsPage;
