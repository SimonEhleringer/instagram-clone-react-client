import React, { useState } from 'react';
import { useEffect } from 'react';
import { FeedPostResponseDto, getFeed } from '../../api/meFeed';
import { UserResponseDto } from '../../api/meFollowed';
import { getSuggestions } from '../../api/meSuggestions';
import Feed from '../../feed/Feed';
import AppLayout from '../../shared/AppLayout';
import { ButtonType } from '../../shared/Button';
import Loader from '../../shared/Loader';
import NormalPageLayout from '../../shared/NormalPageLayout';
import UserProfilePreview from '../../shared/ProfilePreview/UserProfilePreview';
import './style.scss';
import MyProfilePreview from '../../shared/ProfilePreview/MyProfilePreview';
import { getEmitHelpers } from 'typescript';
import { getMe } from '../../api/me';
import { Link } from 'react-router-dom';
import { buildSuggestionsPath } from '../../routes';

const IndexPage = () => {
  const [feed, setFeed] = useState<FeedPostResponseDto[] | undefined>(
    undefined
  );
  const [suggestions, setSuggestions] = useState<UserResponseDto[] | undefined>(
    undefined
  );
  const [me, setMe] = useState<UserResponseDto | undefined>(undefined);

  useEffect(() => {
    getFeed().then((val) => setFeed(val.data.feed));
    getMe().then((val) => setMe(val.data));
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    const response = await getSuggestions();

    const suggestions = response.data.suggestions.filter(
      (val, index) => index < 5
    );

    setSuggestions(suggestions);
  };

  // TODO: Handle what happens if no posts are available for feed
  return (
    <AppLayout>
      {!feed || !suggestions || !me ? (
        <Loader />
      ) : (
        <NormalPageLayout>
          <div className='index-page__vertical-split-layout'>
            <div className='index-page__feed'>
              <Feed feed={feed} />
            </div>
            <div className='index-page__right'>
              <div className='index-page__my-profile-preview'>
                <MyProfilePreview me={me} avatarSizeInPx={56} />
              </div>

              <div className='index-page__suggestions-heading'>
                <span className='index-page__suggestions-heading-text'>
                  Vorschläge für dich
                </span>
                <Link
                  className='index-page__all-suggestions-link'
                  to={buildSuggestionsPath()}
                >
                  Alle ansehen
                </Link>
              </div>
              <div className='index-page__suggestions'>
                {suggestions.map((suggestion) => (
                  <div className='index-page__suggestion'>
                    <UserProfilePreview
                      user={suggestion}
                      avatarSizeInPx={32}
                      buttonType={ButtonType.PrimaryText}
                      handleSuccessfulSubscription={loadSuggestions}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </NormalPageLayout>
      )}
    </AppLayout>
  );
};

export default IndexPage;
