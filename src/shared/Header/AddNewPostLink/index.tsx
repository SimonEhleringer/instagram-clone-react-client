import React, { useRef } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import HeaderLink from '../HeaderLink';
import './style.scss';
import { setImage } from '../../../redux/newPost/slice';
import { reducer } from '../../../config/store';

// TODO: Add tests
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

      dispatch(setImage(reader.result));

      history.push('/new-post');
    };
  };

  return (
    <button onClick={handleButtonClick} className='add-new-post-link-button'>
      <input
        ref={fileInputRef}
        type='file'
        className='add-new-post-link-file-input'
        onChange={handleFileInputChange}
      />

      <div className='add-new-post-link-prevent-click' />
      <HeaderLink
        Icon={BsPlusCircle}
        ActiveIcon={BsPlusCircleFill}
        to='/new-post'
      />
    </button>
  );
};

export default AddNewPostLink;
