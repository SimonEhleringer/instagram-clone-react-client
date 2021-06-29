import React, { useRef } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import HeaderLink from '../HeaderLink';
import './style.scss';
import { setSelectedImageDataUri } from '../../../redux/newPost/slice';
import { buildNewPostPath } from '../../../routes';
import { useReadFileFromEvent } from '../../hooks/useReadFileFromEvent';
import InvisibleButton from '../../InvisibleButton';
import HiddenImageInput from '../../HiddenImageInput';
import { useHiddenInput } from '../../hooks/useHiddenInput';

const AddNewPostLink = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { readFileFromEvent } = useReadFileFromEvent();

  const { fileInputRef, pretendClickOnFileInput } = useHiddenInput();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    readFileFromEvent(e, (dataUri) => {
      dispatch(setSelectedImageDataUri(dataUri));

      history.push(buildNewPostPath());
    });
  };

  return (
    <InvisibleButton onClick={() => pretendClickOnFileInput()}>
      <HiddenImageInput ref={fileInputRef} onChange={handleInputChange} />

      <div className='add-new-post-link__prevent-click' />
      <HeaderLink
        Icon={BsPlusCircle}
        ActiveIcon={BsPlusCircleFill}
        to={buildNewPostPath()}
      />
    </InvisibleButton>
  );
};

export default AddNewPostLink;
