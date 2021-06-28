import React, { useRef } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import HeaderLink from '../HeaderLink';
import './style.scss';
import { setSelectedImageDataUri } from '../../../redux/newPost/slice';
import { buildNewPostPath } from '../../../routes';
import { useReadFileFromEvent } from '../../hooks/useReadFileFromEvent';
import { useHiddenImageInput } from '../../hooks/useHiddenImageInput';
import InvisibleButton from '../../InvisibleButton';

const AddNewPostLink = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { readFileFromEvent } = useReadFileFromEvent();

  const { fileInput, pretendClickOnFileInput } = useHiddenImageInput(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      readFileFromEvent(e, (dataUri) => {
        dispatch(setSelectedImageDataUri(dataUri));

        history.push(buildNewPostPath());
      });
    }
  );

  return (
    <InvisibleButton onClick={() => pretendClickOnFileInput()}>
      {fileInput}

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
