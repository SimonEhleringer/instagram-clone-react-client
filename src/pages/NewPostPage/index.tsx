import React from 'react';
import { useLocation } from 'react-router-dom';
import NewPostForm from '../../new-post/NewPostForm';
import ResponsiveHeading from '../../shared/ResponsiveHeading';
import SlimPageLayout from '../../shared/SlimPageLayout';

export interface NewPostPageState {
  selectedImageDataUri: string;
}

const NewPostPage: React.FC = () => {
  const location = useLocation<NewPostPageState>();

  return (
    <SlimPageLayout>
      <ResponsiveHeading>Neuer Beitrag</ResponsiveHeading>

      <NewPostForm imageDataUri={location.state.selectedImageDataUri} />
    </SlimPageLayout>
  );
};

export default NewPostPage;
