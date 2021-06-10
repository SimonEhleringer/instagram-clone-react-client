import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Loader from "../../shared/Loader";
import AppLayout from "../../shared/AppLayout";
import SuggestionsList from "../../suggestions/SuggestionsList";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../config/store";
import { loadSuggestions } from "../../redux/suggestions/slice";
import { useUpdateEffect } from "../../shared/hooks/useUpdateEffect";

const SuggestionsPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const isStoreLoading = useSelector(
    (state: ReduxState) => state.suggestionsState.isLoading
  );

  const suggestions = useSelector(
    (state: ReduxState) => state.suggestionsState.suggestions
  );

  useEffect(() => {
    dispatch(loadSuggestions());
  }, [dispatch]);

  useUpdateEffect(() => {
    setIsLoading(isStoreLoading);
  }, [isStoreLoading]);

  return (
    <AppLayout>
      <Loader loading={isLoading}>
        <div className="suggestions-page__layout">
          <div className="suggestions-page__wrapper">
            <h1 className="suggestions-page__heading">Vorschläge für dich</h1>

            <SuggestionsList suggestions={suggestions} />
          </div>
        </div>
      </Loader>
    </AppLayout>
  );
};

export default SuggestionsPage;
