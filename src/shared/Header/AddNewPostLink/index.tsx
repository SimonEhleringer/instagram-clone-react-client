import React from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router';
import HeaderLink from '../HeaderLink';
import './style.scss';
import { buildNewPostPath, buildNewPostPathname } from '../../../routes/path';
import { useReadFileFromEvent } from '../../hooks/useReadFileFromEvent';
import InvisibleButton from '../../InvisibleButton';
import HiddenImageInput from '../../HiddenImageInput';
import { useHiddenInput } from '../../hooks/useHiddenInput';
import { NewPostPageState } from '../../../pages/NewPostPage';

const AddNewPostLink = () => {
  const history = useHistory();
  const { readFileFromEvent } = useReadFileFromEvent();

  const { fileInputRef, pretendClickOnFileInput } = useHiddenInput();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    readFileFromEvent(e, (dataUri) => {
      const state: NewPostPageState = {
        selectedImageDataUri: dataUri,
      };

      history.push(buildNewPostPath(state));
    });
  };

  return (
    <InvisibleButton onClick={() => pretendClickOnFileInput()}>
      <HiddenImageInput
        ref={fileInputRef}
        onChange={handleInputChange}
        data-testid='hiddenNewPostInput'
      />

      <div className='add-new-post-link__prevent-click' />
      <HeaderLink
        Icon={BsPlusCircle}
        ActiveIcon={BsPlusCircleFill}
        to={buildNewPostPathname()}
        dataTestId='newPostPageLink'
      />
    </InvisibleButton>
  );
};

export default AddNewPostLink;
