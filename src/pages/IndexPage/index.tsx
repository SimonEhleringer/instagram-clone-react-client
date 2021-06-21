import React, { useState } from 'react';
import { useEffect } from 'react';
import { FeedPostResponseDto, getFeed } from '../../api/meFeed';
import Feed from '../../feed/Feed';
import AppLayout from '../../shared/AppLayout';
import Loader from '../../shared/Loader';
import NormalPageLayout from '../../shared/NormalPageLayout';

const IndexPage = () => {
  const [feed, setFeed] =
    useState<FeedPostResponseDto[] | undefined>(undefined);

  useEffect(() => {
    getFeed().then((val) => setFeed(val.data.feed));
  });

  return (
    <AppLayout>
      {!feed ? (
        <Loader />
      ) : (
        <NormalPageLayout>
          <Feed feed={feed} />
        </NormalPageLayout>
      )}
    </AppLayout>
  );
};

export default IndexPage;
