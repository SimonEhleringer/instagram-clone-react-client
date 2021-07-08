import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { getMe } from '../../api/me';
import { FeedPostResponseDto, getFeed } from '../../api/me-feed';
import { getSuggestions } from '../../api/me-suggestions';
import { UserResponseDto } from '../../api/shared-dtos';
import Feed from '../../feed/Feed';
import { buildSuggestionsPath } from '../../routes/path';
import NormalPageLayout from '../../shared/NormalPageLayout';
import PageLoader from '../../shared/PageLoader';
import MyProfilePreview from '../../shared/ProfilePreview/MyProfilePreview';
import VerticalSplitLayout from '../../shared/VerticalSplitLayout';
import SideBarSuggestions from '../../suggestions/SideBarSuggestions';
import './style.scss';

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
