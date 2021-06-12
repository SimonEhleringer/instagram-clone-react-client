import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../config/store';
import NewPostForm from '../../newPost/NewPostForm';
import AppLayout from '../../shared/AppLayout';
import SlimPageLayout from '../../shared/SlimPageLayout';
import ResponsiveHeading from '../../shared/ResponsiveHeading';

// TODO: Add tests
// TODO: Make components for unnessecary double styles (suggestions has some styles that are exactly same)
const NewPostPage = () => {
  return (
    <AppLayout>
      <SlimPageLayout>
        <ResponsiveHeading>Neuer Beitrag</ResponsiveHeading>

        <NewPostForm />
      </SlimPageLayout>
    </AppLayout>
  );
};

export default NewPostPage;
