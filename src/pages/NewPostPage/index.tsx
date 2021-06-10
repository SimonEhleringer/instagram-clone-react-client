import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../config/store';
import NewPostForm from '../../newPost/NewPostForm';
import AppLayout from '../../shared/AppLayout';
import './style.scss';

// TODO: Add tests
// TODO: Make components for unnessecary double styles (suggestions has some styles that are exactly same)
const NewPostPage = () => {
  return (
    <AppLayout>
      <div className='new-post-page__layout'>
        <div className='new-post-page__wrapper'>
          <NewPostForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default NewPostPage;
