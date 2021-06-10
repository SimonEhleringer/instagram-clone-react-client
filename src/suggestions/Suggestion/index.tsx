import React, { useState } from "react";
import { addFollow, UserResponseDto } from "../../api/meFollowed";
import Avatar from "../../shared/Avatar";
import Button from "../../shared/Button";
import { Link } from "react-router-dom";
import "./style.scss";
import { useDispatch } from "react-redux";
import { loadSuggestions } from "../../redux/suggestions/slice";

export interface SuggestionProps {
  suggestion: UserResponseDto;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestion }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { userId, fullName, username, publicProfileImageId } = suggestion;

  const handleSubscribe = async (userIdToSubscribeTo: string) => {
    setLoading(true);

    await addFollow(userIdToSubscribeTo);

    dispatch(loadSuggestions());

    setLoading(false);
  };

  return (
    <div className="suggestion">
      <Avatar publicProfileImageId={publicProfileImageId} widthInPx={44} />

      {/* TODO: Change route for link */}
      <div className="suggestion__user-information">
        <Link
          to="/"
          className="suggestion__username"
          data-testid="suggestionUsername"
        >
          {username}
        </Link>

        <div className="suggestion__full-name" data-testid="suggestionFullName">
          {fullName}
        </div>
      </div>

      <div className="suggestion__button">
        <Button
          testId="button"
          loading={loading}
          htmlInputProps={{
            onClick: () => handleSubscribe(userId),
          }}
        >
          Abonnieren
        </Button>
      </div>
    </div>
  );
};

export default Suggestion;
