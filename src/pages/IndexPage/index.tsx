import React, { useState } from 'react';
import { useEffect } from 'react';
import { FeedPostResponseDto, getFeed } from '../../api/meFeed';
import { UserResponseDto } from '../../api/meFollowed';
import { getSuggestions } from '../../api/meSuggestions';
import Feed from '../../feed/Feed';
import PageLoader from '../../shared/PageLoader';
import NormalPageLayout from '../../shared/NormalPageLayout';
import './style.scss';
import MyProfilePreview from '../../shared/ProfilePreview/MyProfilePreview';
import { getMe } from '../../api/me';
import SideBarSuggestions from '../../suggestions/SideBarSuggestions';
import VerticalSplitLayout from '../../shared/VerticalSplitLayout';
import { Redirect } from 'react-router';
import { buildSuggestionsPath } from '../../routes/path';

const IndexPage: React.FC = () => {
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

  return (
    <>
      {!feed || !suggestions || !me ? (
        <PageLoader />
      ) : (
        <>
          {feed.length === 0 ? (
            <Redirect to={buildSuggestionsPath()} />
          ) : (
            <NormalPageLayout>
              <VerticalSplitLayout>
                <div className='index-page__feed'>
                  <Feed feed={feed} />
                </div>
                <div className='index-page__right'>
                  <div className='index-page__my-profile-preview'>
                    <MyProfilePreview me={me} avatarSizeInPx={56} />
                  </div>

                  <SideBarSuggestions
                    loadSuggestions={loadSuggestions}
                    suggestions={suggestions}
                  />
                </div>
              </VerticalSplitLayout>
            </NormalPageLayout>
          )}
        </>
      )}
    </>
  );
};

export default IndexPage;
