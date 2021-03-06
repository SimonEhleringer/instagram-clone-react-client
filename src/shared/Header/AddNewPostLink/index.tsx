import React from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { NewPostPageState } from '../../../pages/NewPostPage';
import { buildNewPostPath, buildNewPostPathname } from '../../../routes/path';
import HiddenImageInput from '../../HiddenImageInput';
import { useHiddenInput } from '../../hooks/useHiddenInput';
import { useReadFileFromEvent } from '../../hooks/useReadFileFromEvent';
import InvisibleButton from '../../InvisibleButton';
import HeaderLink from '../HeaderLink';
import './style.scss';

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
        data-testid='hidden-new-post-input'
      />

      <div className='add-new-post-link__prevent-click' />
      <HeaderLink
        Icon={BsPlusCircle}
        ActiveIcon={BsPlusCircleFill}
        to={buildNewPostPathname()}
        dataTestId='new-post-page-link'
      />
    </InvisibleButton>
  );
};

export default AddNewPostLink;
