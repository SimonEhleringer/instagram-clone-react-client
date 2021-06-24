import React, { useRef } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import HeaderLink from '../HeaderLink';
import './style.scss';
import { setSelectedImageDataUri } from '../../../redux/newPost/slice';
import { buildNewPostPath } from '../../../routes';

const AddNewPostLink = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return;
      }

      dispatch(setSelectedImageDataUri(reader.result));

      history.push(buildNewPostPath());
    };
  };

  return (
    <button onClick={handleButtonClick} className='add-new-post-link__button'>
      <input
        data-testid='fileInput'
        ref={fileInputRef}
        type='file'
        accept='image/png, image/jpeg'
        className='add-new-post-link__file-input'
        onChange={handleFileInputChange}
      />

      <div className='add-new-post-link__prevent-click' />
      <HeaderLink
        Icon={BsPlusCircle}
        ActiveIcon={BsPlusCircleFill}
        to={buildNewPostPath()}
      />
    </button>
  );
};

export default AddNewPostLink;
